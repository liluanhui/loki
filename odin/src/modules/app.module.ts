import { DraftModule } from "./mail/draft/draft.module";
import { MailModule } from "./mail/mail.module";
import { UserModule } from "./user/user.module";
import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "../../config/configuration";
import { DecryptMiddleware } from "src/middleware/decrypt.middleware";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "./auth/auth.module";

const envPath = `.env.${process.env.NODE_ENV || "development"}`;

@Module({
  imports: [
    DraftModule,
    MailModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: [envPath],
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE || "fpo",
      autoLoadModels: true,
      synchronize: true,
      define: {
        underscored: true,
      },
      timezone: "+08:00", // 保存为本地时区
      dialectOptions: {
        dateStrings: true,
        typeCast(field, next) {
          if (field.type === "DATETIME") {
            return field.string();
          }
          return next();
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecryptMiddleware).forRoutes("*");
  }
}

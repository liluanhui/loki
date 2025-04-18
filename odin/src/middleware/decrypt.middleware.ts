import configuration from 'config/configuration';
import { Request, Response, NextFunction } from 'express';
import { aesDecrypt, rsaDecrypt } from 'src/utils/encrypt';
import { businessError, paramsError } from 'src/utils/throw';

export async function DecryptMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (isDevelopmentEnvironment()) return next();

  if (!isPostRequest(req)) return next();

  const { key, data } = req.body;
  if (!key || !data) return paramsError();

  try {
    const rawKey = await decryptKey(key);
    const decryptData = decryptBodyData(data, rawKey);

    req.body = decryptData;
    next();
  } catch (error) {
    businessError(error.message || '解密失败');
  }
}

function isDevelopmentEnvironment(): boolean {
  return configuration()['env'] === 'development';
}

function isPostRequest(req: Request): boolean {
  return req.method === 'POST';
}

async function decryptKey(key: string): Promise<string> {
  try {
    return await rsaDecrypt(key, 'dev');
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    throw new Error('参数解析失败-key');
  }
}

function decryptBodyData(
  data: string,
  rawKey: string,
): Record<string, unknown> {
  try {
    const decrypted = aesDecrypt(data, rawKey);
    return JSON.parse(decrypted);
  } catch {
    throw new Error('参数解析失败-data');
  }
}

export class LoginForm {
  /** 用户名 */
  uid: string = '1';
  /** 密码 */
  password: string = '1';
}

export interface LoginRes {
  /** token */
  token: string;
  /** 用户id */
  uid: string;
}

export type OauthType = 'github' | 'weibo';

export class OauthLoginForm {
  type: OauthType;
  code: string = '';
}

export class OauthInfoForm {
  type: OauthType;
  id: string = '';
}

export class OauthBindForm {
  type: OauthType;
  id: string = '';
  user_form: LoginForm = new LoginForm();
}

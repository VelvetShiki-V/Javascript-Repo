interface LoginForm {
  username: string
  password: string
}

// 登录表单类型校验
export class LoginData implements LoginForm {
  username: string
  password: string
  constructor(username: string = '', password: string = '') {
    this.username = username
    this.password = password
  }
}

// 注册表单类型校验
export class RegistryData extends LoginData {
  repassword: string
  tel: string
  constructor(
    username: string = '',
    password: string = '',
    repassword: string = '',
    tel: string = ''
  ) {
    super(username, password)
    this.repassword = repassword
    this.tel = tel
  }
}

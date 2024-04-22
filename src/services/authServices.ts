import http from '@/utils/http'

type LoginParam = {
  email: string
  password: string
}

type LoginGoogleParam = {
  token: string
}

type RegisterParam = {
  firstName: string
  lastName: string
  email: string
  password: string
  gender: string
}

type RequestCodeParam = {
  email: string
  type: number
}

type HandleActiveParam = {
  email: string
  code: string
}

const PREV_URL = '/auth'

const AuthServices = {
  login: (param: LoginParam) => {
    return http.post(PREV_URL + '/login', param)
  },

  loginGoogle: (param: LoginGoogleParam) => {
    return http.post(PREV_URL + '/login-google', param)
  },

  register: (param: RegisterParam) => {
    return http.post(PREV_URL + '/register', param)
  },

  refresh: () => {
    return http.post(PREV_URL + '/refresh')
  },

  requestCode: (param: RequestCodeParam) => {
    return http.post(PREV_URL + '/request-code', param)
  },

  handleActive: (param: HandleActiveParam) => {
    return http.post(PREV_URL + '/active-email', param)
  },
}

export default AuthServices

import { RequestLoginParams } from '@/types'
import userStore from '../user/slice'
import { getUserInfo, postLogin } from '@/request/api'

// 登录
export async function fetchLogin(params: RequestLoginParams) {
  const response = await postLogin(params)
  if (!response.code) {
    userStore.getState().login({ ...response.data })
  }
  return response
}

// 获取用户信息
export async function fetchUserInfo() {
  const response = await getUserInfo()
  if (!response.code) {
    userStore.getState().login({
      token: userStore.getState().token,
      user_info: response.data
    })
  }
  return response
}

export default {
  fetchUserInfo,
  fetchLogin
}

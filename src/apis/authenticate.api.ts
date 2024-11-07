import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

const URL = '/auth-api/v1/auth'

const authApi = {
  loginAccount: (body: { emailOrUserName: string; password: string }) => http.post<AuthResponse>(`${URL}/login`, body),
  logoutAccount: () => http.post('/logout')
}

export default authApi

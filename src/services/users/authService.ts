import axios from '@/libs/axios'
import { UsuarioLogin } from '@/interfaces/UsuarioLogin'
import { UsuarioAuth } from '@/interfaces/UsuarioAuth'
import { Usuario } from '@/interfaces/Usuario'

interface LoginResponse {
  token: string;
}

export const login = async (usuario: UsuarioLogin) => {
  const { data } =  await axios.post<LoginResponse>('/auth/login', usuario)
  return data
}

export const getProfile = async () => {
  const { data } = await axios.get<UsuarioAuth>('/auth/profile')
  return data
}

export const register = async (usuario: Usuario) => {
  const { data } = await axios.post('/auth/register', usuario)
  return data
}

export const confirmAccount = async (token: string) => {
  const { data } = await axios.get(`/auth/confirm-account/${token}`)
  return data
}

export const resetToken = async (email: string) => {
  const { data } = await axios.post('/auth/confirm-account/reset', { email })
  return data
}

export const resetPassword = async (email: string) => {
  const { data } = await axios.post('/auth/forgot-password', { email })
  return data
}

export const validateToken = async (token: string) => {
  const { data } = await axios.get(`/auth/reset/${token}`)
  return data
}

export const changePassword = async (token: string, password: string) => {
  const { data } = await axios.put(`/auth/reset/${token}`, { password })
  return data
}
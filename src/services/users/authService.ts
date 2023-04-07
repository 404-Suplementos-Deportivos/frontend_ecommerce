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

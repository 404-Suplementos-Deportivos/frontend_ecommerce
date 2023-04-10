import axios from '@/libs/axios'
import { Usuario } from '@/interfaces/Usuario'

export const getUser = async (id: string): Promise<Usuario> => {
  const { data } = await axios.get<Usuario>(`/users/${id}`)
  return data
}
import { z } from 'zod'

export interface UsuarioLogin {
  email: string
  password: string
}

const UsuarioLoginSchema = z.object({
  email: z.string().email('El email no es válido').nonempty('El email no puede estar vacío'),
  password: z.string().nonempty('La contraseña no puede estar vacía')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
}).strict()
type UsuarioLoginType = z.infer<typeof UsuarioLoginSchema>
export { UsuarioLoginSchema }
export type { UsuarioLoginType }
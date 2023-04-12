import { z } from 'zod'

export interface Usuario {
  id?: number
  nombre: string
  apellido: string
  email: string
  password?: string
  direccion: string
  codigoPostal: number
  telefono?: string | null
  fechaNacimiento?: string | null
}

const UsuarioSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().nonempty('El nombre no puede estar vacío'),
  apellido: z.string().nonempty('El apellido no puede estar vacío'),
  email: z.string().email('El email no es válido').nonempty('El email no puede estar vacío'),
  password: z.string().nonempty('La contraseña no puede estar vacía')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .refine((value) => {
      const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
      return regex.test(value)
    }, 'Al menos una letra mayúscula, una letra minúscula, un número y un caracter especial'),
  direccion: z.string().nonempty('La dirección no puede estar vacía'),
  codigoPostal: z.number().int().min(1000, 'El código postal debe tener al menos 4 dígitos'),
  telefono: z.string().refine((value) => {
    const regex = new RegExp('^\\+?([0-9]{2})?[-. ]?([0-9]{2})?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$')
    return regex.test(value)
  }, 'El formato debe ser +54 11 1234 5678').optional().nullable(),
  fechaNacimiento: z.string().optional().nullable(),
}).strict()
type UsuarioType = z.infer<typeof UsuarioSchema>
export { UsuarioSchema }
export type { UsuarioType }


const UsuarioEditSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().nonempty('El nombre no puede estar vacío'),
  apellido: z.string().nonempty('El apellido no puede estar vacío'),
  email: z.string().email('El email no es válido').nonempty('El email no puede estar vacío'),
  direccion: z.string().nonempty('La dirección no puede estar vacía'),
  codigoPostal: z.number().int().min(1000, 'El código postal debe tener al menos 4 dígitos'),
  telefono: z.string().refine((value) => {
    const regex = new RegExp('^\\+?([0-9]{2})?[-. ]?([0-9]{2})?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$')
    return regex.test(value)
  }, 'El formato debe ser +54 11 1234 5678').optional().nullable(),
  fechaNacimiento: z.string().optional().nullable(),
}).strict()
type UsuarioEditType = z.infer<typeof UsuarioEditSchema>
export { UsuarioEditSchema }
export type { UsuarioEditType }

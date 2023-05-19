import { z } from 'zod'

export interface ChangePassword {
  password: string;
  confirmPassword: string;
}

const ChangePasswordSchema = z.object({
  password: z.string().nonempty('La contraseña no puede estar vacía')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .refine((value) => {
      const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
      return regex.test(value)
    }, 'Al menos una letra mayúscula, una letra minúscula, un número y un caracter especial'),
  confirmPassword: z.string().nonempty('La contraseña no puede estar vacía')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .refine((value) => {
      const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
      return regex.test(value)
    }, 'Al menos una letra mayúscula, una letra minúscula, un número y un caracter especial'),
}).strict()
type ChangePasswordType = z.infer<typeof ChangePasswordSchema>
export { ChangePasswordSchema }
export type { ChangePasswordType }
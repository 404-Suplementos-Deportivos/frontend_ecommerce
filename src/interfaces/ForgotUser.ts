import { z } from 'zod'

export interface ForgotUser {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const ForgotUserSchema = z.object({
  email: z.string().nonempty('El email no puede estar vacío').email('El email no es válido').optional(),
  password: z.string().nonempty('La contraseña no puede estar vacía')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .refine((value) => {
      const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
      return regex.test(value)
    }, 'Al menos una letra mayúscula, una letra minúscula, un número y un caracter especial')
    .optional(),
  confirmPassword: z.string().nonempty('La confirmación de contraseña no puede estar vacía')
    .min(8, 'La confirmación de contraseña debe tener al menos 8 caracteres')
    .refine((value) => {
      const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
      return regex.test(value)
    }
    , 'Al menos una letra mayúscula, una letra minúscula, un número y un caracter especial')
    .optional()
})

type ForgotUserType = z.infer<typeof ForgotUserSchema>
export { ForgotUserSchema }
export type { ForgotUserType }
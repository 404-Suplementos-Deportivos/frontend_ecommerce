import { useState, useEffect } from "react"
import { Input } from "@nextui-org/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from 'next/router'
import { useAppDispatch } from "@/hooks/useReduxStore"
import { showToast } from "@/store/features/design/designSlice"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { resetPassword, validateToken, changePassword } from "@/services/users/authService"
import { Password, PasswordSchema } from "@/interfaces/Password"

interface ForgotPasswordState {
  email: string
  password: string
  formErrors: ErrorForm[]
}

type ErrorForm = {
  [key: string]: string
}

// TODO: Validar Password con mismo Schema que Usuario
export default function ConfirmAccount() {
  const [email, setEmail] = useState<ForgotPasswordState['email']>('')
  const [password, setPassword] = useState<ForgotPasswordState['password']>('')
  const [formErrors, setFormErrors] = useState<ForgotPasswordState['formErrors']>([{}])
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { token } = router.query

  useEffect(() => {
    if (token) {
      const validateTokenData = async () => {
        try {
          const data = await validateToken(token as string)
          dispatch(showToast({
            type: 'success',
            message: data.message
          }))
        } catch (error: any) {
          dispatch(showToast({
            type: 'error',
            message: error.response.data.message
          }))
        }
      }
      validateTokenData()
    }
  }, [token, dispatch, router])

  const enviarCorreo = async () => {
    try {
      const data = await resetPassword(email)
      dispatch(showToast({
        type: 'success',
        message: data.message
      }))
      setTimeout(() => {
        router.push('/')
      }, 2500);
    } catch (error: any) {
      dispatch(showToast({
        type: 'error',
        message: error.response.data.message
      }))
    } finally {
      setEmail('')
    }
  }

  const cambiarPassword = async () => {
    try {
      if(!validateForm()) return
      const data = await changePassword(token as string, password)
      dispatch(showToast({
        type: 'success',
        message: data.message
      }))
      setTimeout(() => {
        router.push('/')
      }, 2500);
    } catch (error: any) {
      dispatch(showToast({
        type: 'error',
        message: error.response.data.message
      }))
    } finally {
      setPassword('')
    }
  }

  const validateForm = (): boolean => {
    const passwordData: Password = {
      password
    }
    try {
      const validate = PasswordSchema.parse(passwordData)
      return true
    } catch (error: any) {
      const errores: ErrorForm[] = error.errors
      const FormPaths = errores.map((error: ErrorForm) => {
        const { path, message } = error
        return { [path]: message }
      })
      setFormErrors(FormPaths)
      return false
    }
  }

  const findErrorMessage = (fieldName: string): string => {
    const error = formErrors.find((error: ErrorForm) => error[fieldName] )
    if (error) {
      const errorMessage: string = Object.values(error)[0] as string
      return errorMessage;
    }
    return ''
  }

  return (
    <>
      <Head>
        <title>404 Suplementos Deportivos | Recuperar Contraseña</title>
        <meta name="description" content='Tienda online de suplementos deportivos e insumos de gimnasio con una amplia variedad de productos de alta calidad para ayudarte a alcanzar tus objetivos fitness. Contamos con las marcas más reconocidas del mercado, brindando a nuestros clientes confianza y seguridad en cada compra.' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/404_Icono_White.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="logo inverted">404</h2>
        <h1 className="text-4xl font-bold text-gray-800">Recuperar Contraseña</h1>
        <p>Ingrese su correo electrónico para recuperar su contraseña</p>
        <div className="mt-2 flex flex-col items-center justify-center gap-2">
          {!token ? (
            <div className="flex flex-row gap-4">
              <input 
                type="text" 
                className="border border-grisMedio px-2" 
                placeholder="Correo electrónico" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}  
              />
              <button onClick={enviarCorreo} className="btn btn-primary bg-verde text-blanco p-2">Enviar correo</button>
            </div>
          ) : (
            <div className="flex flex-row gap-4">
              <Input.Password
                placeholder="Tu nueva contraseña"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}  
                helperText={findErrorMessage('password')}
                helperColor={findErrorMessage('password') ? 'error' : 'success'}
              />
              <button onClick={cambiarPassword} className="btn btn-primary bg-verde text-blanco p-2">Cambiar contraseña</button>
            </div>
          )}
          <Link href="/" className="text-verde text-xl font-bold mt-2">Volver a la página principal</Link>
        </div>
      </div>
      <ToastContainer
        pauseOnHover
        theme="dark"
        autoClose={2000}
        style={{ zIndex: '10000' }}
      />
    </>
  )
}

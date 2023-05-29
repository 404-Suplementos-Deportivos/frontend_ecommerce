import { useState, useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from 'next/router'
import { useAppDispatch } from "@/hooks/useReduxStore"
import { showToast } from "@/store/features/design/designSlice"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { confirmAccount , resetToken} from "@/services/users/authService"

interface ConfirmAccountState {
  error: boolean
  email: string
}

// TODO: Validar Email con mismo Schema que Usuario
export default function ConfirmAccount() {
  const [error, setError] = useState<ConfirmAccountState['error']>(false)
  const [email, setEmail] = useState<ConfirmAccountState['email']>('')
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { token } = router.query

  useEffect(() => {
    if (token) {
      const confirmAccountData = async () => {
        try {
          const data = await confirmAccount(token as string)
          dispatch(showToast({
            type: 'success',
            message: data?.message ?? 'Cuenta confirmada con éxito'
          }))
          setTimeout(() => {
            router.push('/')
          }, 2500);
        } catch (error: any) {
          dispatch(showToast({
            type: 'error',
            message: error.response?.data?.message ?? 'Error al confirmar cuenta'
          }))
          setError(true)
        }
      }
      confirmAccountData()
    }
  }, [token, dispatch, router])

  const reenviarCorreo = async () => {
    try {
      const data = await resetToken(email)
      dispatch(showToast({
        type: 'success',
        message: data?.message ?? 'Correo reenviado con éxito'
      }))
      setTimeout(() => {
        router.push('/')
      }, 2500);
    } catch (error: any) {
      dispatch(showToast({
        type: 'error',
        message: error.response?.data?.message ?? 'Error al reenviar correo'
      }))
    } finally {
      setEmail('')
    }
  }

  return (
    <>
      <Head>
        <title>404 Suplementos Deportivos | Confirmar Cuenta</title>
        <meta name="description" content='Tienda online de suplementos deportivos e insumos de gimnasio con una amplia variedad de productos de alta calidad para ayudarte a alcanzar tus objetivos fitness. Contamos con las marcas más reconocidas del mercado, brindando a nuestros clientes confianza y seguridad en cada compra.' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/404_Icono_White.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="logo inverted">404</h2>
        <h1 className="text-4xl font-bold text-gray-800">Confirmar Cuenta</h1>
        <p>Si su cuenta fue confirmada, será redirigido a la página principal.</p>
        {error && (
          <div className="mt-2 flex flex-col items-center justify-center gap-2">
            <p className="text-rojo text-xl font-bold">Hubo un error al confirmar su cuenta.</p>
            <div className="flex flex-row gap-4">
              <input 
                type="text" 
                className="border border-grisMedio px-2" 
                placeholder="Correo electrónico" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}  
              />
              <button onClick={reenviarCorreo} className="btn btn-primary bg-verde text-blanco p-2">Reenviar correo</button>
            </div>
            <Link href="/" className="text-verde text-xl font-bold">Volver a la página principal</Link>
          </div>
        )}
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

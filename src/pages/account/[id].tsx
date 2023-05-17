import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Layout from "@/components/Layout/Layout"
import Loader from "@/components/Layout/Navbar/Loader"
import EditForm from '@/components/Login/EditForm'
import ChangePassword from "@/components/Login/ChangePassword"
import Orders from "@/components/Login/Orders"
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { useProtectedRoute } from "@/hooks/useProtectedRoute"
import { getUserAsync } from "@/store/features/user/userSlice"
import { showToast } from "@/store/features/design/designSlice"
import { cleanCart } from "@/store/features/product/cartSlice"
import { saveComprobante, getComprobantes } from "@/services/billing/billingService"
import { Comprobante } from "@/interfaces/Comprobante"

enum Views {
  PROFILE= 'profile',
  PASSWORD= 'password',
  ORDERS= 'orders'
}

interface EditPageState {
  comprobantes: Comprobante[]
}

export default function EditPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { usuario, error, loading: loadingUser } = useAppSelector(state => state.user)
  const { isAuth, loading: loadingAuth } = useAppSelector(state => state.auth)
  const [comprobantes, setComprobantes] = useState<EditPageState['comprobantes']>([])

  const { view, id, payment_id } = router.query // view = profile, password, orders or undefinedw

  useProtectedRoute()

  useEffect(() => {
    if(view === Views.ORDERS) {
      obtenerComprobantes()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view])

  useEffect(() => {
    if(payment_id) {
      guardarComprobante(payment_id as string)
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment_id])

  useEffect(() => {
    if(id) {
      dispatch(getUserAsync(id as string));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (view && !Object.values(Views).includes(view as Views)) {
      router.push('/404')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view])

  useEffect(() => {
    if (error.type === 'error') {
      dispatch(showToast(error))
    }
  }, [error, dispatch]);

  const guardarComprobante = async (idOrden: string) => {
    try {
      const response = await saveComprobante(idOrden)
      if(response.data === 'approved') {
        dispatch(showToast({
          type: 'success',
          message: response.message
        }))
        dispatch(cleanCart())
        obtenerComprobantes()
      } else {
        dispatch(showToast({
          type: 'error',
          message: response.message
        }))
      }
    } catch (error: any) {
      console.log( error.response.data.message )
      dispatch(showToast({
        type: 'error',
        message: error.response.data.message
      }))
    } finally {
      // Cargar ordenes
      obtenerComprobantes()
    }
  }

  const obtenerComprobantes = async () => {
    try {
      const response = await getComprobantes()
      setComprobantes(response.data)
    } catch (error: any) {
      console.log( error.response.data.message )
      dispatch(showToast({
        type: 'error',
        message: error.response.data.message
      }))
    }
  }

  return (
    !loadingUser && !loadingAuth && isAuth ? (
      <Layout title='Editar perfil' description='Editar perfil'>
        <div className='mx-auto py-4 w-5/6 md:grid md:grid-cols-5 min-h-[calc(100vh-20rem)]'>
          <div className='md:col-span-2 flex flex-col'>
            <Link href={`/account/${id}?view=${Views.PROFILE}`} className={`w-fit ${view === Views.PROFILE && 'font-black text-verde'}`}>Editar perfil</Link>
            <Link href={`/account/${id}?view=${Views.PASSWORD}`} className={`w-fit ${view === Views.PASSWORD && 'font-black text-verde'}`}>Cambiar contraseña</Link>
            <Link href={`/account/${id}?view=${Views.ORDERS}`} className={`w-fit ${view === Views.ORDERS && 'font-black text-verde'}`}>Historial de Compras</Link>
          </div>
          <div className="md:col-span-3 mt-6 md:mt-0">
            {view === Views.PROFILE && <EditForm />}
            {view === Views.PASSWORD && <ChangePassword />}
            {view === Views.ORDERS && <Orders comprobantes={comprobantes} />}
          </div>
        </div>
      </Layout>
    ) : (
      <Layout title='Editar perfil' description='Editar perfil'>
        <Loader />
      </Layout>
    )
  )
}

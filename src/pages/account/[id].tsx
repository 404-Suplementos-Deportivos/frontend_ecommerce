import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Layout from "@/components/Layout/Layout"
import EditForm from '@/components/Login/EditForm'
import ChangePassword from "@/components/Login/ChangePassword"
import Orders from "@/components/Login/Orders"
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { getUserAsync } from "@/store/features/user/userSlice"
import { showToast } from "@/store/features/design/designSlice"

enum Views {
  PROFILE= 'profile',
  PASSWORD= 'password',
  ORDERS= 'orders'
}

export default function EditPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { usuario, error, loading } = useAppSelector(state => state.user)

  const { view, id } = router.query // view = profile, password, orders or undefinedw

  useEffect(() => {
    if(id) {
      dispatch(getUserAsync(id as string));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (error.type === 'error') {
      dispatch(showToast(error))
    }
  }, [error, dispatch]);

  return (
    <Layout title="Editar perfil">
      <div className='mx-auto py-4 w-5/6 md:grid md:grid-cols-5'>
        <div className='md:col-span-2 flex flex-col'>
          <Link href={`/account/${id}?view=${Views.PROFILE}`} className={`w-fit ${view === Views.PROFILE && 'font-black text-verde'}`}>Editar perfil</Link>
          <Link href={`/account/${id}?view=${Views.PASSWORD}`} className={`w-fit ${view === Views.PASSWORD && 'font-black text-verde'}`}>Cambiar contraseña</Link>
          <Link href={`/account/${id}?view=${Views.ORDERS}`} className={`w-fit ${view === Views.ORDERS && 'font-black text-verde'}`}>Historial de Compras</Link>
        </div>
        <div className="md:col-span-3 mt-6 md:mt-0">
          {view === Views.PROFILE && <EditForm />}
          {view === Views.PASSWORD && <ChangePassword />}
          {view === Views.ORDERS && <Orders />}
        </div>
      </div>
    </Layout>
  )
}
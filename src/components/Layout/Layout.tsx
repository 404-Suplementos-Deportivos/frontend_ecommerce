import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import Loader from './Navbar/Loader'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector, useAppDispatch } from '@/hooks/useReduxStore'
import { setToken, setUsuarioAuth, clearUsuarioAuth } from '@/store/features/auth/authSlice'
import { getProductsAsync } from '@/store/features/product/productsSlice'
import { getProfileAsync } from '@/store/features/auth/authSlice'
import { showToast } from '@/store/features/design/designSlice';
import { setIsReady } from '@/store/features/design/designSlice'

interface Props {
  children: React.ReactNode | JSX.Element | JSX.Element[]
  title: string
  description?: string
  desc?: string
}

interface LayoutState {
  showToastRef: React.MutableRefObject<boolean>
  isNavbarOpen: boolean
  isReady: boolean
}

const desc: string = 'Tienda online de suplementos deportivos e insumos de gimnasio con una amplia variedad de productos de alta calidad para ayudarte a alcanzar tus objetivos fitness. Contamos con las marcas más reconocidas del mercado, brindando a nuestros clientes confianza y seguridad en cada compra.'

export default function Layout({children, title, description=desc}: Props) {
  const showToastRef = useRef(false);
  const isNavbarOpen = useAppSelector<LayoutState['isNavbarOpen']>(state => state.design.isNavbarToggled)
  const token = useAppSelector(state => state.auth.token)
  const { loading: loadingProductos } = useAppSelector(state => state.productos)
  const { loading: loadingUser } = useAppSelector(state => state.user)
  const { loading: loadingAuth } = useAppSelector(state => state.auth)
  const { isReady } = useAppSelector(state => state.design)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProductsAsync({categoria:'', subcategoria:''}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (loadingProductos === false && loadingUser === false && loadingAuth === false) {
      dispatch(setIsReady(true))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingProductos, loadingUser, loadingAuth])

  useEffect(() => {
    if(localStorage.getItem('token')) {
      const getProfile = async () => {
        dispatch(setToken(localStorage.getItem('token') as string))
        await dispatch(getProfileAsync())
      }
      getProfile()
    } else {
      dispatch(clearUsuarioAuth())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>{`404 Suplementos Deportivos | ${title}`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/404_Icono_White.ico" />
      </Head>

      {!isReady && (
        <Loader />
      )}

      <div className={`bg-grisMuyClaro flex flex-col h-full ${isNavbarOpen && 'overflow-hidden h-screen'}`}>
        <Header />
        <div className='flex-grow'>
          {children}
        </div>
        <ToastContainer
          pauseOnHover
          theme="dark"
          autoClose={2000}
          style={{ zIndex: '10000' }}
        />
        <Footer />
      </div>
    </>
  )
}
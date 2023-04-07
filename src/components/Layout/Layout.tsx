import { useEffect, useRef } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProfile } from '@/services/users/authService'
import { useAppSelector, useAppDispatch } from '@/hooks/useReduxStore'
import { setToken, setUsuarioAuth, clearUsuarioAuth } from '@/store/features/auth/authSlice'
import { showToast } from '@/store/features/design/designSlice';

interface Props {
  children: React.ReactNode | JSX.Element | JSX.Element[]
  title: string
  description?: string
  desc?: string
}

interface LayoutState {
  showToastRef: React.MutableRefObject<boolean>
  isNavbarOpen: boolean
}

const desc: string = 'Tienda online de suplementos deportivos e insumos de gimnasio con una amplia variedad de productos de alta calidad para ayudarte a alcanzar tus objetivos fitness. Contamos con las marcas más reconocidas del mercado, brindando a nuestros clientes confianza y seguridad en cada compra.'

export default function Layout({children, title, description=desc}: Props) {
  const showToastRef = useRef(false);
  const isNavbarOpen = useAppSelector<LayoutState['isNavbarOpen']>(state => state.design.isNavbarToggled)
  const token = useAppSelector(state => state.auth.token)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(setToken(localStorage.getItem('token') as string))
      const getProfileData = async () => {
        try {
          const data = await getProfile()
          dispatch(setUsuarioAuth(data))
        } catch (error: any) {
          if (!showToastRef.current) {
            showToastRef.current = true;
            dispatch(showToast({
              type: 'error',
              message: error.response.data.message
            }));
            dispatch(clearUsuarioAuth())
          }
        }
      }
      getProfileData()
    } else {
      dispatch(clearUsuarioAuth())
    }
  }, [dispatch, token])

  return (
    <>
      <Head>
        <title>{`404 Suplementos Deportivos | ${title}`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/404_Icono_White.ico" />
      </Head>

      <div className={`${isNavbarOpen && 'overflow-hidden h-screen'}`}>
        <Header />
          {children}
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
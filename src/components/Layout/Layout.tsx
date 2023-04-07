import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { useAppSelector } from '@/hooks/useReduxStore'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  children: React.ReactNode | JSX.Element | JSX.Element[]
  title: string
  description?: string
  desc?: string
}

const desc: string = 'Tienda online de suplementos deportivos e insumos de gimnasio con una amplia variedad de productos de alta calidad para ayudarte a alcanzar tus objetivos fitness. Contamos con las marcas más reconocidas del mercado, brindando a nuestros clientes confianza y seguridad en cada compra.'

export default function Layout({children, title, description=desc}: Props) {
  const isNavbarOpen = useAppSelector(state => state.design.isNavbarToggled)
  const isCartMenuOpen = useAppSelector(state => state.design.isCartToggled)

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
          />
        <Footer />
      </div>
    </>
  )
}
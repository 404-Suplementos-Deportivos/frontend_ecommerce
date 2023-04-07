import Link from 'next/link'
import Navbar from './Navbar/Navbar'
import CartMenu from './Navbar/CartMenu'
import SearchBar from './Navbar/SearchBar'
import SearchList from './Navbar/SearchList'
import ModalLogin from '../Login/ModalLogin'
import { Tooltip, Popover, Button } from "@nextui-org/react";
import { Bars3Icon, XMarkIcon, ChatBubbleLeftEllipsisIcon, UserIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { toggleNavbar, toggleCart, toggleModalLogin } from '@/store/features/design/designSlice'
import { clearUsuarioAuth } from '@/store/features/auth/authSlice'

interface HeaderDesktopProps {
  isAtTop: boolean
}

const HeaderDesktop = ({isAtTop}: HeaderDesktopProps) => {
  const isNavbarOpen = useAppSelector(state => state.design.isNavbarToggled)
  const isCartMenuOpen = useAppSelector(state => state.design.isCartToggled)
  const userAuth = useAppSelector(state => state.auth.usuario)
  const dispatch = useAppDispatch()

  return (
    <header className={`z-50 bg-grisOscuro static ${!isAtTop && 'fixed top-0 left-0 right-0'}`}>
      <div className='flex flex-row justify-between items-center mx-auto py-4 w-5/6 text-blanco'>
        <div className='flex flex-row items-center gap-4' >
          {isNavbarOpen ? (
            <XMarkIcon className='h-6 w-6 cursor-pointer text-verde' onClick={() => dispatch(toggleNavbar(false))}   />
          ) : (
            <Bars3Icon className='h-6 w-6 cursor-pointer' onClick={() => dispatch(toggleNavbar(true))}   />
          )}
          <h3 className='logo'>404</h3>
        </div>

        <div className='w-8/12 relative'>
          <SearchBar />
          {/* <SearchList /> */}
        </div>

        <div className='flex flex-row items-center gap-6'>
          <Link href={'/ayuda'} className='flex flex-col justify-center items-center hover:text-verde transition-colors ease-in-out cursor-pointer'>
            <Tooltip content={'Contacta con nosotros'} placement={'bottom'} color='success' >
              <ChatBubbleLeftEllipsisIcon className='h-6 w-6 cursor-pointer'/>
            </Tooltip>
          </Link>
          <button className='flex flex-col justify-center items-center hover:text-verde transition-colors ease-in-out cursor-pointer'>
            {userAuth ? (
              <Tooltip content={`Hola ${userAuth.nombre}!`} placement={'bottom'} color='success' >
                <Popover>
                  <Popover.Trigger>
                    <UserIcon className='h-6 w-6' />
                  </Popover.Trigger>
                  <Popover.Content className='bg-blanco rounded-lg shadow-md'>
                    <div className='flex flex-col gap-2 p-2'>
                      <Link href={'/mi-cuenta'} className='text-negro hover:text-blanco hover:bg-verde py-2 px-4 rounded-md'>
                        Mi Cuenta
                      </Link>
                      <button 
                        className='text-negro hover:text-blanco hover:bg-rojo py-2 px-4 rounded-md transition-colors ease-in-out duration-300'
                        onClick={() => dispatch(clearUsuarioAuth())}
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </Popover.Content>
                </Popover>
              </Tooltip>
            ) : (
              <Tooltip content={'Mi cuenta'} placement={'bottom'} color='success' >
                <UserIcon className='h-6 w-6' onClick={() => dispatch(toggleModalLogin(true))} />
              </Tooltip>
            )}
          </button>
          <p className='hover:text-verde transition-colors ease-in-out cursor-pointer'>
            <ShoppingCartIcon 
              className={`h-6 w-6 r ${isCartMenuOpen && 'text-verde'}`}
              onMouseEnter={() => dispatch(toggleCart(true))}
            />
          </p>
        </div>
      </div>
      {(isNavbarOpen || isCartMenuOpen) && (
        <div 
          className="fixed w-full h-full z-10 bg-grisClaro/50 cursor-pointer"
          onClick={() => {
            dispatch(toggleNavbar(false))
            dispatch(toggleCart(false))
          }}
        ></div>
      )}
      <Navbar />
      <CartMenu />
      <ModalLogin />
    </header>
  )
}

export default HeaderDesktop
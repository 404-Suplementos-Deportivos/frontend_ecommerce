import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from './Navbar/Navbar'
import CartMenu from './Navbar/CartMenu'
import SearchBar from './Navbar/SearchBar'
import SearchList from './Navbar/SearchList'
import ModalLogin from '../Login/ModalLogin'
import { Tooltip } from "@nextui-org/react";
import { Bars3Icon, XMarkIcon, ChatBubbleLeftEllipsisIcon, UserIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen'
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { toggleNavbar, toggleCart, toggleModalLogin } from '@/store/features/design/designSlice'
import NavbarMobile from './Navbar/NavbarMobile'

interface HeaderState {
  isAtTop: boolean
}

const Header = () => {
  const isSmallScreen = useIsSmallScreen(768)
  const [isAtTop, setIsAtTop] = useState<HeaderState['isAtTop']>(true)
  const isNavbarOpen = useAppSelector(state => state.design.isNavbarToggled)
  const isCartMenuOpen = useAppSelector(state => state.design.isCartToggled)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 0) {
        setIsAtTop(false)
      } else {
        setIsAtTop(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {isSmallScreen ? (
        // Mobile
        <header className={`z-50 bg-grisOscuro ${!isAtTop && 'fixed top-0 left-0 right-0'}`}>
          <div className='mx-auto w-5/6 py-4'>
            <div className='flex flex-row justify-between items-center text-blanco'>
              <div className='flex flex-row items-center gap-4'>
                {isNavbarOpen ? (
                  <XMarkIcon className='h-6 w-6 cursor-pointer text-verde' onClick={() => dispatch(toggleNavbar(false))} />
                ) : (
                  <Bars3Icon className='h-6 w-6 cursor-pointer' onClick={() => dispatch(toggleNavbar(true))} />
                )}
              </div>
              <div>
                <h3 className='logo'>404</h3>
              </div>
              <div className='flex flex-row items-center gap-6'>
                <p className='hover:text-verde transition-colors ease-in-out cursor-pointer'>
                  <ShoppingCartIcon 
                    className={`h-6 w-6 r ${isCartMenuOpen && 'text-verde'}`}
                    onClick={() => dispatch(toggleCart(true))}
                  />
                </p>
              </div>
            </div>
            <div className='relative'>
              <SearchBar />
              {/* <SearchList /> */}
            </div>
          </div>
          <NavbarMobile />
          <CartMenu />
          <ModalLogin />
        </header>
      ): (
        // Desktop
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
                <Tooltip content={'Mi cuenta'} placement={'bottom'} color='success' >
                  <UserIcon className='h-6 w-6' onClick={() => dispatch(toggleModalLogin(true))} />
                </Tooltip>
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
      )}
    </>
  )
}

export default Header
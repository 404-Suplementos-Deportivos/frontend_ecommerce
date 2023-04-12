import Link from 'next/link'
import CartMenu from './Navbar/CartMenu'
import SearchBar from './Navbar/SearchBar'
import SearchList from './Navbar/SearchList'
import ModalLogin from '../Login/ModalLogin'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { toggleNavbar, toggleCart } from '@/store/features/design/designSlice'
import NavbarMobile from './Navbar/NavbarMobile'

interface HeaderMobileProps {
  isAtTop: boolean
}

const HeaderMobile = ({isAtTop}: HeaderMobileProps) => {
  const isNavbarOpen = useAppSelector(state => state.design.isNavbarToggled)
  const isCartMenuOpen = useAppSelector(state => state.design.isCartToggled)
  const userAuth = useAppSelector(state => state.auth.usuario)
  const dispatch = useAppDispatch()

  return (
    <header className={`z-[200] bg-grisOscuro ${!isAtTop && 'fixed top-0 left-0 right-0'}`}>
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
            <Link href='/'>
              <h3 className='logo'>404</h3>
            </Link>
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
  )
}

export default HeaderMobile
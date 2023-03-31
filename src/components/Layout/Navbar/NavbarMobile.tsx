import { useState } from "react"
import Link from "next/link"
import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline'
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { toggleModalLogin } from "@/store/features/design/designSlice"

interface NavbarMobileState {
  isSubMenuItemOpen: boolean
}

const NavbarMobile = () => {
  const isNavbarOpen = useAppSelector(state => state.design.isNavbarToggled)
  const [isSubMenuItemOpen, setIsSubMenuItemOpen] = useState<NavbarMobileState['isSubMenuItemOpen']>(false)
  const dispatch = useAppDispatch()

  const handleChangeSubMenu = () => {
    setIsSubMenuItemOpen(!isSubMenuItemOpen)
  }

  return (
    <>
      <div className={`bg-grisMedio overflow-y-auto fixed h-[600px] w-screen z-[100] transform transition-all ease-in-out duration-300 ${isNavbarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="h-full flex flex-col justify-between">
          <div>
            <div 
              className="flex justify-between items-center text-blanco p-4 border-b border-b-grisClaro hover:bg-grisClaro transition-colors ease-in-out"
            >
              <Link href="/productos">Productos</Link>
              <ChevronDownIcon className="h-6 w-6" onClick={handleChangeSubMenu} />
            </div>
            {isSubMenuItemOpen && (
              <div 
                className="bg-grisMuyClaro z-20 text-negro p-4 flex flex-col gap-2"
              >
                <div>
                  <h4>Categoria</h4>
                  <ul>
                    <li>SubCategoria</li>
                    <li>SubCategoria</li>
                    <li>SubCategoria</li>
                    <li>SubCategoria</li>
                  </ul>
                </div>
              </div>
            )}
            <div 
              className="flex justify-between items-center text-blanco p-4 border-b border-b-grisClaro hover:bg-grisClaro transition-colors ease-in-out"
            >
              <Link href="/ayuda">Contacta con nosotros</Link>
            </div>
          </div>
          <div className="mt-12 text-blanco flex flex-row gap-2 px-2" onClick={() => dispatch(toggleModalLogin(true))}>
            <UserIcon className="h-6 w-6" />
            <p>Iniciar Sesion o Crear una cuenta</p>
          </div>
        </nav>
      </div>
    </>
  )
}

export default NavbarMobile
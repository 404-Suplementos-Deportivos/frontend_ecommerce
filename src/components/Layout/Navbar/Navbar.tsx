import { useState } from "react"
import Link from "next/link"
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useAppSelector } from "@/hooks/useReduxStore"

interface NavbarState {
  isSubMenuItemOpen: boolean
}

const Navbar = () => {
  const isNavbarOpen = useAppSelector(state => state.design.isNavbarToggled)
  const [isSubMenuItemOpen, setIsSubMenuItemOpen] = useState<NavbarState['isSubMenuItemOpen']>(false)

  const handleSubMenuItemEnter = () => {
    setIsSubMenuItemOpen(true)
  }

  const handleSubMenuItemLeave = () => {
    setIsSubMenuItemOpen(false)
  }

  return (
    <>
      {/* {isNavbarOpen && ( */}
      <div className={`flex flex-row fixed z-[200] transform transition-all ease-in-out duration-300 ${isNavbarOpen ? "translate-x-0" : "-translate-x-full"} `}
        onMouseLeave={handleSubMenuItemLeave}
      >
        <nav className='bg-grisMedio h-screen w-[300px]'>
          <div>
            <div 
              className="flex justify-between items-center text-blanco p-4 border-b border-b-grisClaro hover:bg-grisClaro transition-colors ease-in-out"
              onMouseEnter={handleSubMenuItemEnter}
            >
              <Link href="/products">Productos</Link>
              <ChevronRightIcon className="h-6 w-6" />
            </div>
            <div 
              className="flex justify-between items-center text-blanco p-4 border-b border-b-grisClaro hover:bg-grisClaro transition-colors ease-in-out"
              onMouseEnter={handleSubMenuItemEnter}
            >
              <Link href="/products">Ropa</Link>
              <ChevronRightIcon className="h-6 w-6" />
            </div>
          </div>
        </nav>
        {isSubMenuItemOpen && (
          <div 
            className="bg-grisMuyClaro h-fit max-w-[900px] z-20 text-negro p-4 flex flex-row flex-wrap gap-x-8"
            onMouseLeave={handleSubMenuItemLeave}
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
      </div>
      {/* )} */}
    </>
  )
}

export default Navbar
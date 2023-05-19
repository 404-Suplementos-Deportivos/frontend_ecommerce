import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline'
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { clearUsuarioAuth } from "@/store/features/auth/authSlice"
import { toggleModalLogin, toggleNavbar } from "@/store/features/design/designSlice"
import { getSubcategoriesAsync } from "@/store/features/product/productsSlice"

interface NavbarMobileState {
  isSubMenuItemOpen: Record<number, boolean>
}

const NavbarMobile = () => {
  const isNavbarOpen = useAppSelector(state => state.design.isNavbarToggled)
  const userAuth = useAppSelector(state => state.auth.usuario)
  const { categorias, subcategorias } = useAppSelector(state => state.productos);
  const [isSubMenuItemOpen, setIsSubMenuItemOpen] = useState<NavbarMobileState['isSubMenuItemOpen']>({}) // actualizamos el estado inicial
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    // Cerrar el menú al navegar
    dispatch(toggleNavbar(false))
    setIsSubMenuItemOpen({}) // actualizamos el estado inicial  
  }, [router.query, dispatch])

  useEffect(() => {
    // Inicializamos el estado de las subcategorías para cada categoría
    const initialState: Record<number, boolean> = {}
    categorias.forEach(categoria => {
      if(categoria.id) initialState[categoria.id] = false
    })
    setIsSubMenuItemOpen(initialState)
  }, [categorias])

  const handleChangeSubMenu = (id: number | undefined) => {
    if (id) {
      dispatch(getSubcategoriesAsync(id))
      setIsSubMenuItemOpen(prevState => {
        return {
          ...prevState,
          [id]: !prevState[id] // actualizamos el valor booleano correspondiente a la categoría seleccionada
        }
      })
    }
  }

  return (
    <>
      <div className={`bg-grisMedio overflow-y-auto fixed h-[600px] w-screen z-[200] transform transition-all ease-in-out duration-300 ${isNavbarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="h-full flex flex-col justify-between">
          <div>
            {categorias.map(categoria => (
              <div key={categoria.id}>
                <div 
                  className="flex justify-between items-center text-blanco p-4 border-b border-b-grisClaro hover:bg-grisClaro transition-colors ease-in-out"
                >
                  <Link href={`/products?categoriaSelected=${categoria.id}`} passHref>{categoria.nombre}</Link>
                  <ChevronDownIcon className="h-6 w-6" onClick={() => handleChangeSubMenu(categoria.id)} />
                </div>
                {categoria.id && isSubMenuItemOpen[categoria.id] && ( // utilizamos el valor booleano correspondiente a la categoría para mostrar u ocultar las subcategorías
                  subcategorias
                    .filter(subcategoria => subcategoria.idCategoria === categoria.id)
                    .map(subcategoria => (
                      <div
                        key={subcategoria.id}
                        className="bg-grisMuyClaro z-20 text-negro p-4 flex flex-col gap-2"
                      >
                        <div>
                          <ul>
                            <li>
                              <Link key={subcategoria.id} href={`/products?categoriaSelected=${subcategoria.idCategoria}&subcategoriaSelected=${subcategoria.id}`} passHref>
                                {subcategoria.nombre}
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))
                )}
              </div>
            ))}
            <div 
              className="flex justify-between items-center text-blanco p-4 border-b border-b-grisClaro hover:bg-grisClaro transition-colors ease-in-out"
            >
              <Link href="/products">Todos los productos</Link>
            </div>
            <div 
              className="flex justify-between items-center text-blanco p-4 border-b border-b-grisClaro hover:bg-grisClaro transition-colors ease-in-out"
            >
              <Link href="/ayuda?view=terminos">Contacta con nosotros</Link>
            </div>
          </div>
          <div className="mt-12 mb-2 text-blanco flex flex-row gap-2 px-2">
            <UserIcon className="h-6 w-6" />
            {userAuth ? (
              <>
                <Link href={`/account/${userAuth.id}?view=profile`} onClick={() => dispatch(toggleNavbar(false))}>Mi Cuenta: {userAuth.email}</Link>
                {' | '}
                <button onClick={() => {
                  dispatch(clearUsuarioAuth())
                  router.push('/')
                }}>Cerrar Sesion</button>
              </>
            ) : (
              <p 
                className="cursor-pointer" 
                onClick={() => dispatch(toggleModalLogin(true))}
              >
                Iniciar Sesion o Crear una cuenta
              </p>
            )}
          </div>
        </nav>
      </div>
    </>
  )
}

export default NavbarMobile
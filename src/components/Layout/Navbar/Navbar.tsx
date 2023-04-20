import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxStore"
import { getCategoriesAsync } from "@/store/features/product/productsSlice"
import { getSubcategoriesAsync } from "@/store/features/product/productsSlice"

interface NavbarState {
  isSubMenuItemOpen: boolean
}

const Navbar = () => {
  const isNavbarOpen = useAppSelector(state => state.design.isNavbarToggled);
  const [isSubMenuItemOpen, setIsSubMenuItemOpen] = useState<NavbarState['isSubMenuItemOpen']>(false);
  const dispatch = useAppDispatch();
  const { categorias, subcategorias } = useAppSelector(state => state.productos);

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (categorias.length > 0 && categorias[0].id) {
      dispatch(getSubcategoriesAsync(categorias[0].id));
    }
  }, [categorias, dispatch]);

  const handleSubMenuItemEnter = (id: number) => {
    setIsSubMenuItemOpen(true);
    dispatch(getSubcategoriesAsync(id));
  };

  const handleSubMenuItemLeave = () => {
    setIsSubMenuItemOpen(false);
  };


  return (
    <div className={`flex flex-row fixed z-[200] transform transition-all ease-in-out duration-300 ${isNavbarOpen ? "translate-x-0" : "-translate-x-full"} `}
      onMouseLeave={handleSubMenuItemLeave}
    >
      <nav className='bg-grisMedio h-screen w-[300px]'>
        <div>
          {categorias.map(categoria => {
            return (
              <div 
                key={categoria.id}
                className="flex justify-between items-center text-blanco p-4 border-b border-b-grisClaro hover:bg-grisClaro transition-colors ease-in-out"
                onMouseEnter={() => handleSubMenuItemEnter(Number(categoria.id))}
              >
                <Link href={`/products?categoriaSelected=${categoria.id}`} passHref>
                  {categoria.nombre}
                </Link>
                <ChevronRightIcon className="h-5 w-5" />
              </div>
            )
          })}
          <div 
            className="flex justify-between items-center text-blanco p-4 border-b border-b-grisClaro hover:bg-grisClaro transition-colors ease-in-out"
          >
            <Link href='/products'>
              Todos los productos
            </Link>
            <ChevronRightIcon className="h-5 w-5" />
          </div>
        </div>
      </nav>
      {isSubMenuItemOpen && (
        <div 
          className="bg-grisMuyClaro h-fit max-w-[900px] z-20 text-negro p-4 grid grid-cols-auto gap-x-8"
          onMouseLeave={handleSubMenuItemLeave}
        >
          {subcategorias.map(subcategoria => (
            <Link key={subcategoria.id} href={`/products?categoriaSelected=${subcategoria.idCategoria}&subcategoriaSelected=${subcategoria.id}`} passHref className="mb-2">
              {subcategoria.nombre}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Navbar
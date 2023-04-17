import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Categoria } from '@/interfaces/Categoria'
import { Subcategoria } from '@/interfaces/Subcategoria'
import { useAppDispatch } from '@/hooks/useReduxStore'
import { getSubcategoriesAsync } from '@/store/features/product/productsSlice'

interface FiltersState {
  filter: {
    categoriaSelected: string
    subcategoriaSelected: string
  },
  search: string
}

interface FiltersProps {
  categorias: Categoria[]
  subcategorias: Subcategoria[]
}

const INITIAL_STATE: FiltersState = {
  filter: {
    categoriaSelected: '',
    subcategoriaSelected: '',
  },
  search: '',
}

const Filters = ({categorias, subcategorias}: FiltersProps) => {
  const [search, setSearch] = useState<FiltersState['search']>('')
  const [filter, setFilter] = useState<FiltersState['filter']>(INITIAL_STATE.filter)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { categoriaSelected, subcategoriaSelected } = filter

  useEffect(() => {
    if (categoriaSelected) {
      dispatch(getSubcategoriesAsync(Number(categoriaSelected)))
    } 
    if(!categoriaSelected) {
      setFilter({
        ...filter,
        subcategoriaSelected: '',
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriaSelected, dispatch])
  
  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({
      ...filter,
      categoriaSelected: e.target.value,
    })
  }

  const handleChangeSubcategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({
      ...filter,
      subcategoriaSelected: e.target.value,
    })
  }

  const handleSearch = () => {
    const params = new URLSearchParams();
  if (categoriaSelected) {
    params.append("categoriaSelected", categoriaSelected);
    if (subcategoriaSelected) {
      params.append("subcategoriaSelected", subcategoriaSelected);
    }
  }
  const queryString = params.toString();
  if (queryString) {
    router.push(`/products?${queryString}`);
  } else {
    router.push("/products");
  }
  }

  const handleClear = () => {
    setFilter(INITIAL_STATE.filter)
    setSearch(INITIAL_STATE.search)
    const params = new URLSearchParams(router.asPath.split("?")[1]);
    if (params.has("categoriaSelected")) {
      params.delete("categoriaSelected");
    }
    if (params.has("subcategoriaSelected")) {
      params.delete("subcategoriaSelected");
    }
    const queryString = params.toString();
    if (queryString) {
      router.push(`/products?${queryString}`);
    } else {
      router.push("/products");
    }
  }

  return (
    <>
      <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center bg-grisMuyClaro rounded-xl md:rounded-full py-2 px-4 space-y-4 md:space-y-0">
        <div className="flex flex-row items-center">
          <p className="text-sm text-grisOscuro font-bold">Categoría:</p>
          <select 
            className="ml-2 text-sm text-grisOscuro font-bold border border-grisOscuro rounded-md px-2 py-1 w-full md:w-auto"
            onChange={handleChangeCategory}
            value={filter.categoriaSelected || ''}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((categoria: Categoria) => (
              <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-sm text-grisOscuro font-bold">Subcategoría:</p>
          <select 
            className="ml-2 text-sm text-grisOscuro font-bold border border-grisOscuro rounded-md px-2 py-1 w-full md:w-auto"
            value={filter.subcategoriaSelected || ''}
            onChange={handleChangeSubcategory}
            disabled={!filter.categoriaSelected}
          >
            <option value="">Todas las subcategorías</option>
            {subcategorias.map((subcategoria: Subcategoria) => (
              <option key={subcategoria.id} value={subcategoria.id}>{subcategoria.nombre}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-sm text-grisOscuro font-bold">Ordenar por:</p>
          <select className="ml-2 text-sm text-grisOscuro font-bold border border-grisOscuro rounded-md px-2 py-1 w-full md:w-auto">
            <option value="1">Precio: menor a mayor</option>
            <option value="2">Precio: mayor a menor</option>
            <option value="3">Nombre: A-Z</option>
            <option value="4">Nombre: Z-A</option>
          </select>
        </div>
      </div>
      <div className="mt-2 md:grid md:grid-cols-4 md:items-center bg-grisMuyClaro rounded-xl md:rounded-full py-2 px-4">
        <div className="flex flex-row items-center mt-2 md:mt-0 md:col-span-1">
          <p className="text-sm text-grisOscuro font-bold">Precio entre:</p>
          <select className="ml-2 text-sm text-grisOscuro font-bold border border-grisOscuro rounded-md px-2 py-1 w-full md:w-auto">
            <option value="1">$0 - $3000</option>
            <option value="2">$3000 - $5000</option>
            <option value="3">$5000 - $10000</option>
            <option value="4">+$10000</option>
          </select>
        </div>
        <div className="flex flex-row items-center mt-2 md:mt-0 md:col-span-2">
          <div className="w-full border rounded-sm shadow-sm flex flex-row items-center bg-blanco">
            <div className="px-2">
              <MagnifyingGlassIcon className='h-4 w-4 text-negro bg-blanco' />
            </div>
            <input 
              type="text" 
              placeholder="Buscar en esta categoría" 
              className="text-negro bg-blanco w-full px-3 py-1   rounded-l-md focus:outline-none " 
            />
          </div>
        </div>
        <div className='flex flex-row md:justify-end mt-2 md:mt-0 space-x-2'>
          <button onClick={handleSearch} className='text-blanco bg-grisClaro hover:bg-verde px-4 py-1 rounded-sm transition-colors ease-in-out duration-300'>
            Buscar
          </button>
          <button onClick={handleClear} className='text-blanco bg-grisClaro hover:bg-grisMedio px-4 py-1 rounded-sm transition-colors ease-in-out duration-300'>
            Limpiar
          </button>
        </div>
      </div>
    </>
  )
}

export default Filters
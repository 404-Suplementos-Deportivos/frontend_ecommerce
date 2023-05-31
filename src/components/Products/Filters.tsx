import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Producto } from '@/interfaces/Producto'
import { Categoria } from '@/interfaces/Categoria'
import { Subcategoria } from '@/interfaces/Subcategoria'
import { useAppSelector, useAppDispatch } from '@/hooks/useReduxStore'
import { 
  getSubcategoriesFiltersAsync, 
  setSearch,
  setOrder,
  setPrecio,
  filterProducts,
  clearFilters
} from '@/store/features/product/productsSlice'

enum OrderBy {
  'Precio ASC' = "1",
  'Precio DESC' = "2",
  'Nombre ASC' = "3",
  'Nombre DESC' = "4",
}

enum Precios {
  "Todos" = "0",
  "Entre 0 y 3000" = "1",
  "Entre 3000 y 5000" = "2",
  "Entre 5000 y 10000" = "3",
  "Más de 10000" = "4",
}

interface FiltersState {
  filter: {
    categoriaSelected: string
    subcategoriaSelected: string
  },
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
}

const Filters = ({categorias, subcategorias}: FiltersProps) => {
  const [filter, setFilter] = useState<FiltersState['filter']>(INITIAL_STATE.filter)
  const { productos, categoriaSelectedURL, subcategoriaSelectedURL, search, order, precio } = useAppSelector(state => state.productos)
  const dispatch = useAppDispatch()
  const router = useRouter()

  // ! UseEffects
  useEffect(() => {
    dispatch(filterProducts())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productos])

  useEffect(() => {
    if (categoriaSelectedURL) {
      setFilter(prevState => ({
        ...prevState,
        categoriaSelected: categoriaSelectedURL,
      }))
    }
    if(categoriaSelectedURL == undefined) {
      setFilter(prevState => ({
        ...prevState,
        categoriaSelected: '',
      }))
    }
    if (subcategoriaSelectedURL) {
      setFilter(prevState => ({
        ...prevState,
        subcategoriaSelected: subcategoriaSelectedURL,
      }))
    }
    if(subcategoriaSelectedURL == undefined) {
      setFilter(prevState => ({
        ...prevState,
        subcategoriaSelected: '',
      }))
    }
  }, [router.query, categoriaSelectedURL, subcategoriaSelectedURL])

  useEffect(() => {
    if (filter.categoriaSelected) {
      dispatch(getSubcategoriesFiltersAsync(Number(filter.categoriaSelected)))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.categoriaSelected])

  useEffect(() => {
    dispatch(filterProducts())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, order, precio])

  // ! Handlers
  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(prevState => ({
      ...prevState,
      categoriaSelected: e.target.value,
      subcategoriaSelected: '',
    }))
  }

  const handleChangeSubcategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(prevState => ({
      ...prevState,
      subcategoriaSelected: e.target.value,
    }))
  }

  const handleSearch = () => {
    dispatch(clearFilters())
    const params = new URLSearchParams();
    if (filter.categoriaSelected) {
      params.append("categoriaSelected", filter.categoriaSelected);
      if (filter.subcategoriaSelected) {
        params.append("subcategoriaSelected", filter.subcategoriaSelected);
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
    dispatch(clearFilters())
  }

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value))
  }

  const handleChangeOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setOrder(e.target.value))
  }

  const handleChangePrecio = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPrecio(e.target.value))
  }

  return (
    <>
      <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center bg-grisClaro/25 rounded-xl md:rounded-full py-2 px-4 space-y-4 md:space-y-0">
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
          <select className="ml-2 text-sm text-grisOscuro font-bold border border-grisOscuro rounded-md px-2 py-1 w-full md:w-auto" value={order} onChange={handleChangeOrder}>
            <option value={OrderBy['Precio ASC']}>Precio: menor a mayor</option>
            <option value={OrderBy['Precio DESC']}>Precio: mayor a menor</option>
            <option value={OrderBy['Nombre ASC']}>Nombre: A-Z</option>
            <option value={OrderBy['Nombre DESC']}>Nombre: Z-A</option>
          </select>
        </div>
      </div>
      <div className="mt-2 md:grid md:grid-cols-4 md:items-center bg-grisClaro/25 rounded-xl md:rounded-full py-2 px-4">
        <div className="flex flex-row items-center mt-2 md:mt-0 md:col-span-1">
          <p className="text-sm text-grisOscuro font-bold">Precio entre:</p>
          <select className="ml-2 text-sm text-grisOscuro font-bold border border-grisOscuro rounded-md px-2 py-1 w-full md:w-auto" value={precio} onChange={handleChangePrecio}>
            <option value={Precios['Todos']}>Todos los precios</option>
            <option value={Precios['Entre 0 y 3000']}>$0 - $3000</option>
            <option value={Precios['Entre 3000 y 5000']}>$3000 - $5000</option>
            <option value={Precios['Entre 5000 y 10000']}>$5000 - $10000</option>
            <option value={Precios['Más de 10000']}>+$10000</option>
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
              className="text-negro bg-blanco w-full px-3 py-1 rounded-l-md focus:outline-none" 
              value={search}
              onChange={handleChangeSearch}
            />
          </div>
        </div>
        <div className='flex flex-row md:justify-end mt-2 md:mt-0 space-x-2'>
          <button onClick={handleClear} className='text-blanco bg-grisClaro hover:bg-grisMedio px-4 py-1 rounded-sm transition-colors ease-in-out duration-300'>
            Limpiar
          </button>
          <button onClick={handleSearch} className='text-blanco bg-verde hover:bg-verde/70 px-4 py-1 rounded-sm transition-colors ease-in-out duration-300'>
            Buscar
          </button>
        </div>
      </div>
    </>
  )
}

export default Filters
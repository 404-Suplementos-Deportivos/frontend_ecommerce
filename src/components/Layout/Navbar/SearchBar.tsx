import { ChangeEvent, useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useAppSelector, useAppDispatch } from '@/hooks/useReduxStore'
import { setProductosFilteredSearch } from '@/store/features/product/productsSlice'

interface SearchBarState {
  productosFiltrados: any[]
  search: string
}

const SearchBar = () => {
  const { productos } = useAppSelector(state => state.productos)
  const [state, setState] = useState<SearchBarState>({ productosFiltrados: [], search: '' })
  const dispatch = useAppDispatch()

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value
    if(search !== '') {
      const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(search.toLowerCase()))
      setState({ ...state, productosFiltrados: productosFiltrados.slice(0, 5), search })
      dispatch(setProductosFilteredSearch(productosFiltrados.slice(0, 5)))
    } else {
      setState({ ...state, productosFiltrados: [], search: '' })
      dispatch(setProductosFilteredSearch([]))
    }
  }

  return (
    <div className="border rounded-md shadow-md flex flex-row items-center bg-blanco">
      <div className="px-4">
        <MagnifyingGlassIcon className='h-4 w-4 text-negro bg-blanco' />
      </div>
      <input 
        type="text" 
        placeholder="Buscar" 
        className="text-negro bg-blanco w-full px-3 py-2 rounded-l-md focus:outline-none"
        value={state.search}
        onChange={handleSearch}
      />
    </div>
  )
}

export default SearchBar
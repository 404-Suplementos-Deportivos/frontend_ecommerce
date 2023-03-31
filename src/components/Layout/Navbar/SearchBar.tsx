import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import SearchList from './SearchList'

const SearchBar = () => {
  return (
    <div className="border rounded-md shadow-sm flex flex-row items-center bg-blanco">
      <div className="px-4">
        <MagnifyingGlassIcon className='h-4 w-4 text-negro bg-blanco' />
      </div>
      <input 
        type="text" 
        placeholder="Buscar" 
        className="text-negro bg-blanco w-full px-3 py-2 rounded-l-md focus:outline-none " 
      />
    </div>
  )
}

export default SearchBar
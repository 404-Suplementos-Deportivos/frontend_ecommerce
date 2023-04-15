import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const Filters = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-grisMuyClaro rounded-full py-2 px-4">
        <div className="flex flex-row items-center">
          <p className="text-sm text-grisOscuro font-bold">Categoría:</p>
          <select className="ml-2 text-sm text-grisOscuro font-bold border border-grisOscuro rounded-md px-2 py-1">
            <option value="1">Precio: menor a mayor</option>
            <option value="2">Precio: mayor a menor</option>
            <option value="3">Nombre: A-Z</option>
            <option value="4">Nombre: Z-A</option>
          </select>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-sm text-grisOscuro font-bold">Subcategoría:</p>
          <select className="ml-2 text-sm text-grisOscuro font-bold border border-grisOscuro rounded-md px-2 py-1">
            <option value="1">Precio: menor a mayor</option>
            <option value="2">Precio: mayor a menor</option>
            <option value="3">Nombre: A-Z</option>
            <option value="4">Nombre: Z-A</option>
          </select>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-sm text-grisOscuro font-bold">Ordenar por:</p>
          <select className="ml-2 text-sm text-grisOscuro font-bold border border-grisOscuro rounded-md px-2 py-1">
            <option value="1">Precio: menor a mayor</option>
            <option value="2">Precio: mayor a menor</option>
            <option value="3">Nombre: A-Z</option>
            <option value="4">Nombre: Z-A</option>
          </select>
        </div>
      </div>
      <div className="mt-2 md:grid md:grid-cols-4 md:items-center bg-grisMuyClaro rounded-full py-2 px-4">
        <div className="flex flex-row items-center mt-2 md:mt-0 md:col-span-1">
          <p className="text-sm text-grisOscuro font-bold">Precio entre:</p>
          <select className="ml-2 text-sm text-grisOscuro font-bold border border-grisOscuro rounded-md px-2 py-1">
            <option value="1">Precio: menor a mayor</option>
            <option value="2">Precio: mayor a menor</option>
            <option value="3">Nombre: A-Z</option>
            <option value="4">Nombre: Z-A</option>
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
        <div className='flex flex-row justify-end'>
          <button className='text-blanco bg-grisClaro hover:bg-grisMedio px-4 py-1 rounded-sm transition-colors ease-in-out duration-300'>
            Limpiar
          </button>
        </div>
      </div>
    </>
  )
}

export default Filters
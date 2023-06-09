import Image from 'next/image'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useAppSelector } from '@/hooks/useReduxStore'

const SearchList = () => {
  const { productosFilteredSearch } = useAppSelector(state => state.productos)

  return (
    <div className={`w-full absolute ${productosFilteredSearch.length ? 'block' : 'hidden'}`}>
      {productosFilteredSearch.map(producto => (
        <div key={producto.id} className="bg-grisClaro  border border-grisMedio rounded-b-md text-blanco">
          <Link href={`/products/${producto.id}`} className="h-[120px] grid grid-cols-8 gap-2 md:gap-4 border-b border-b-grisMuyClaro">
            <div className="col-span-2 md:col-span-1 w-full h-full overflow-hidden">
              <Image src={producto.urlImagen} className='object-center w-full h-full' alt='Imagen Producto' width={24} height={24} />
            </div>
            <div className="col-span-5 md:col-span-6 w-full h-full flex flex-col text-sm">
              <p>{producto.nombre}</p>
              <p>${producto.precioVenta}</p>
            </div>
            <div className="col-span-1 w-full h-full flex items-center justify-end md:px-4">
              <ChevronRightIcon className="h-6 w-6" />
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default SearchList
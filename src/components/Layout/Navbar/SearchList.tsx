import Image from 'next/image'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

const SearchList = () => {
  return (
    <div className='w-full absolute'>
      <div className="bg-grisClaro  border border-grisMedio rounded-b-md text-blanco">
        <Link href={'/'} className="h-[120px] grid grid-cols-8 gap-2 md:gap-4 border-b border-b-grisMuyClaro">
          <div className="col-span-2 md:col-span-1 w-full h-full overflow-hidden">
            <Image src={'/next.svg'} className='object-center w-full h-full' alt='Imagen Producto' width={24} height={24} />
          </div>
          <div className="col-span-5 md:col-span-6 w-full h-full flex flex-col text-sm">
            <p>Nombre del Producto Nombre del Producto Nombre del  </p>
            <p>$2500</p>
          </div>
          <div className="col-span-1 w-full h-full flex items-center justify-end md:px-4">
            <ChevronRightIcon className="h-6 w-6" />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SearchList
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-grisOscuro text-blanco py-6">
      <div className="mx-auto w-5/6">
        <div className="flex flex-col md:flex-row md:flex-wrap justify-between">
          <div className="w-full sm:w-1/3">
            <h4 className="text-xl mb-2">Enlaces de navegación</h4>
            <ul className="list-none">
              <li className="mb-1"><Link href={'/'}>Inicio</Link></li>
              <li className="mb-1"><Link href={'/'}>Productos</Link></li>
              <li className="mb-1"><Link href={'/'}>Servicios</Link></li>
              <li className="mb-1"><Link href={'/'}>Acerca de nosotros</Link></li>
              <li className="mb-1"><Link href={'/'}>Contacto</Link></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/3">
            <h4 className="text-xl mb-2">Información de contacto</h4>
            <ul className="list-none">
              <li className="mb-1">Dirección: Calle Falsa 123</li>
              <li className="mb-1">Teléfono: <a href="tel:600123456">555-1234</a></li>
              <li className="mb-1">Email: info@404.com</li>
            </ul>
          </div>
          <div className="w-full sm:w-1/3">
            <h4 className="text-xl mb-2">Síguenos en redes sociales</h4>
            <ul className="list-none">
              <li className="mb-1"><Link href={'/'}>Facebook</Link></li>
              <li className="mb-1"><Link href={'/'}>Twitter</Link></li>
              <li className="mb-1"><Link href={'/'}>Instagram</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
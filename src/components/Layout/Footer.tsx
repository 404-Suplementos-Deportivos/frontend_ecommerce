import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-grisMedio text-blanco">
      <div className="mx-auto w-5/6 py-6">
        <div className="flex flex-col md:flex-row md:flex-wrap justify-between">
          <div className="w-full sm:w-1/3">
            <h4 className="text-xl md:mb-2">Enlaces de navegación</h4>
            <ul className="list-none text-grisMuyClaro">
              <li className="mb-1"><Link href={'/'}>Inicio</Link></li>
              <li className="mb-1"><Link href={'/products'}>Productos</Link></li>
              <li className="mb-1"><Link href={'/'}>Servicios</Link></li>
              <li className="mb-1"><Link href={'/'}>Acerca de nosotros</Link></li>
              <li className="mb-1"><Link href={'/'}>Contacto</Link></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/3">
            <h4 className="text-xl mt-3 md:mt-0 md:mb-2">Información de contacto</h4>
            <ul className="list-none text-grisMuyClaro">
              <li className="mb-1">Dirección: Calle Falsa 123</li>
              <li className="mb-1">Teléfono: <a href="tel:600123456">555-1234</a></li>
              <li className="mb-1">Email: info@404.com</li>
            </ul>
          </div>
          <div className="w-full sm:w-1/3">
            <h4 className="text-xl mt-3 md:mt-0 md:mb-2">Síguenos en redes sociales</h4>
            <ul className="list-none text-grisMuyClaro">
              <li className="mb-1"><Link href={'/'}>Facebook</Link></li>
              <li className="mb-1"><Link href={'/'}>Twitter</Link></li>
              <li className="mb-1"><Link href={'/'}>Instagram</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-grisOscuro">
        <div className="mx-auto w-5/6">
          <p className="md:text-center py-4 m-0 font-bold">404 Suplementos Deportivos. Todos los derechos reservados. &copy; {new Date().getFullYear()}</p>
          <div>
            <ul className="flex flex-col md:flex-row md:justify-center list-none m-0 p-0 text-grisMuyClaro">
              <li className="mr-4"><Link href={'/ayuda?view=terminos'}>Términos y condiciones</Link></li>
              <li className="mr-4"><Link href={'/ayuda?view=privacidad'}>Política de privacidad</Link></li>
              <li className="mr-4"><Link href={'/ayuda?view=cookies'}>Política de cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
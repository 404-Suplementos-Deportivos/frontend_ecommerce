import React from 'react'

const PoliticasCookies = () => {
  return (
    <section>
      <h1 className='text-2xl font-bold'>Políticas de Cookies del Ecommerce de Gimnasio y Suplementos Deportivos</h1>
      <p className='text-justify'>
        Nuestro ecommerce de productos de gimnasio y suplementos deportivos no utiliza cookies o tecnologías similares para almacenar información del 
        usuario y proporcionarte un sitio web más personalizado.
      </p>
      <ol className='list-decimal list-inside mt-5'>
        <li className='text-justify'>
          <span className='font-bold'>¿Qué son las cookies?</span> 
          <p className='text-justify'>
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. Estos archivos contienen información 
            que se utiliza para mejorar la funcionalidad y el rendimiento del sitio, así como para recopilar datos estadísticos y de uso.
          </p>
        </li>

        <li className='text-justify'>
          <span className='font-bold'>Tipos de cookies existenes:</span> 
          <p className='text-justify'>
            Utilizamos tanto cookies propias como cookies de terceros en nuestro sitio web con los siguientes propósitos:
          </p>
          <ul className='list-disc list-inside ml-4'>
            <li className='text-justify'>
              <span className='font-bold'>
                Cookies esenciales:
              </span>
              <p className='text-justify'>
                Estas cookies son necesarias para el funcionamiento básico del sitio y te permiten navegar por las páginas, utilizar funciones y acceder a 
                áreas seguras. Sin estas cookies, el sitio no funcionaría correctamente.
              </p>
            </li>

            <li className='text-justify'>
              <span className='font-bold'>
                Cookies de rendimiento:
              </span>
              <p className='text-justify'>
                Estas cookies recopilan información anónima sobre cómo los usuarios interactúan con nuestro sitio web, como las páginas visitadas, el tiempo de 
                permanencia en el sitio y los errores encontrados. Utilizamos esta información para mejorar la funcionalidad y el rendimiento del sitio.
              </p>
            </li>

            <li className='text-justify'>
              <span className='font-bold'>
                Cookies de funcionalidad:
              </span>
              <p className='text-justify'>
                Estas cookies permiten que el sitio recuerde las elecciones que has realizado (como tu nombre de usuario, idioma o región) y proporcionan características 
                mejoradas y más personalizadas. También se pueden utilizar para ofrecerte servicios solicitados, como la visualización de un video o la 
                participación en un chat en vivo.
              </p>
            </li>

            <li className='text-justify'>
              <span className='font-bold'>
                Cookies de publicidad:
              </span>
              <p className='text-justify'>
                Estas cookies se utilizan para mostrar anuncios relevantes para ti y tus intereses. También pueden limitar la cantidad de veces que ves un anuncio y ayudarnos a 
                medir la efectividad de nuestras campañas publicitarias.
              </p>
            </li>
          </ul>
        </li>

        <li className='text-justify'>
          <span className='font-bold'>Control de cookies:</span> 
          <p className='text-justify'>
            Puedes controlar y administrar las cookies utilizando la configuración de tu navegador. La mayoría de los navegadores te permiten rechazar o aceptar cookies, 
            así como eliminar las cookies existentes. Ten en cuenta que si deshabilitas o eliminas ciertas cookies, es posible que algunas funciones y características 
            de algunos sitios web no funcionen correctamente.
          </p>
        </li>

        <li className='text-justify'>
          <span className='font-bold'>Consentimiento:</span> 
          <p className='text-justify'>
            Al visitar un sitio web por primera vez, se te solicitará tu consentimiento para el uso de cookies de acuerdo con esta política.
          </p>
        </li>

        <li className='text-justify'>
          <span className='font-bold'>Actualizaciones de la Política de Cookies::</span> 
          <p className='text-justify'>
            Nos reservamos el derecho de realizar cambios o actualizaciones en esta Política de Cookies en cualquier momento. Cualquier cambio entrará en vigencia inmediatamente 
            después de su publicación en nuestro sitio web. Te recomendamos revisar esta política periódicamente para estar al tanto de cualquier actualización.
          </p>
        </li>
      </ol>

      <p className='text-justify mt-5'>
        Si tienes alguna pregunta o inquietud sobre nuestra Política de Cookies, no dudes en contactarnos utilizando los medios proporcionados en nuestro sitio web.
      </p>
    </section>
  )
}

export default PoliticasCookies
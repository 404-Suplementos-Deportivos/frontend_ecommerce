import React from 'react'

const PreguntasFrecuentes = () => {
  return (
    <section>
      <h1 className='text-2xl font-bold'>Preguntas frecuentes</h1>
      <ol className='list-decimal list-inside mt-5'>
        <li className='text-justify'>
          <span className='font-bold'>¿Cómo creo mi clave?</span> 
          <p className='text-justify'>
            Para crear tu clave, sigue estos pasos:
          </p>
          <ol className='list-disc list-inside ml-4'>
            <li className='text-justify'>
              <span className='font-bold'>
                Dirígete a la sección de inicio de sesión de nuestro sitio web.
              </span>
            </li>
            <li className='text-justify'>
              <span className='font-bold'>
                Haz clic en el apartado &quot;Crear cuenta&quot;.
              </span>
            </li>
            <li className='text-justify'>
              <span className='font-bold'>
                Rellena el formulario de registro con tus datos personales.
              </span>
            </li>
            <li className='text-justify'>
              <span className='font-bold'>
                Elige una contraseña segura y introdúcela en el campo correspondiente.
              </span>
            </li>
            <li className='text-justify'>
              <span className='font-bold'>
                Haz clic en &quot;Registrarme&quot; para finalizar el proceso.
              </span>
            </li>
          </ol>
          <p className="text-justify">
            Una vez completados estos pasos, tu cuenta estará creada y podrás utilizar tu clave para acceder a nuestro ecommerce.
          </p>
        </li>

        <li className='text-justify'>
          <span className='font-bold'>¿Cómo desbloqueo mi usuario?</span> 
          <p className='text-justify'>
            Si tu usuario se encuentra bloqueado, por favor, sigue estos pasos para desbloquearlo:
          </p>
          <ol className='list-disc list-inside ml-4'>
            <li className='text-justify'>
              <span className='font-bold'>
                Dirígete a la página de inicio de sesión de nuestro sitio web.
              </span>
            </li>
            <li className='text-justify'>
              <span className='font-bold'>
                Haz clic en el enlace &quot;Olvidaste tu clave?&quot;.
              </span>
            </li>
            <li className='text-justify'>
              <span className='font-bold'>
                Ingresa la dirección de correo electrónico asociada a tu cuenta.
              </span>
            </li>
            <li className='text-justify'>
              <span className='font-bold'>
                Recibirás un correo electrónico con las instrucciones para desbloquear tu usuario.
              </span>
            </li>
            <li className='text-justify'>
              <span className='font-bold'>
                Sigue las instrucciones proporcionadas en el correo electrónico para completar el proceso de desbloqueo.
              </span>
            </li>
          </ol>
          <p className="text-justify">
            Si sigues experimentando problemas para desbloquear tu usuario, te recomendamos que te pongas en contacto con nuestro equipo de soporte para obtener asistencia adicional.
          </p>
        </li>

        <li className='text-justify'>
          <span className='font-bold'>¿A qué dirección de mail me puedo contactar para hacer una sugerencia o reclamo?</span> 
          <p className='text-justify'>
            Puedes enviarnos tus sugerencias o reclamos a la siguiente dirección de correo electrónico: <a href="mailto:404suplementosdeportivos@gmail.com">404suplementosdeportivos@gmail.com</a>. 
            Nos esforzaremos por responder a tu consulta en el menor tiempo posible.
          </p>
        </li>

        <li className='text-justify'>
          <span className='font-bold'>¿Cómo puedo pausar temporalmente mi suscripción?</span> 
          <p className='text-justify'>
            Si deseas pausar temporalmente tu suscripción, por favor, sigue estos pasos:
          </p>
          <ol className='list-disc list-inside ml-4'>
            <li className='text-justify'>
              <span className='font-bold'>
                Inicia sesión en tu cuenta en nuestro sitio web.
              </span>
            </li>
            <li className='text-justify'>
              <span className='font-bold'>
                Dirígete a la sección de &quot;Mi cuenta&quot;.
              </span>
            </li>
            <li className='text-justify'>
              <span className='font-bold'>
                Busca la opción de &quot;Eliminar cuenta&quot;.
              </span>
            </li>
            <li className='text-justify'>
              <span className='font-bold'>
                Haz clic en la opción correspondiente y sigue las instrucciones proporcionadas.
              </span>
            </li>
          </ol>
          <p className="text-justify">
            Ten en cuenta que la disponibilidad de la opción de pausar la suscripción puede depender de las condiciones específicas de tu plan y de nuestras políticas vigentes. Si no encuentras 
            la opción de pausar tu suscripción o tienes alguna pregunta adicional, te recomendamos que te pongas en contacto con nuestro equipo de atención al cliente.
          </p>
        </li>

        <li className='text-justify'>
          <span className='font-bold'>¿Tienes alguna duda o quieres comunicarte con nosotros?</span> 
          <p className='text-justify'>
            Si tienes alguna duda o necesitas comunicarte con nosotros, puedes utilizar los siguientes canales de comunicación:
          </p>
          <ol className='list-disc list-inside ml-4'>
            <li className='text-justify'>
              <span className='font-bold'>
                Correo electrónico: <a href="mailto:404suplementosdeportivos@gmail.com">404suplementosdeportivos@gmail.com</a> 
              </span>
            </li>
          </ol>
          <p className="text-justify">
            Nuestro equipo estará encantado de ayudarte y responder a todas tus preguntas.
          </p>
        </li>

        <li className='text-justify'>
          <span className='font-bold'>¿Qué medios de pago aceptan?</span> 
          <p className='text-justify'>
            Aceptamos únicamente pagos a través de MercadoPago. Al realizar una compra, aceptas cumplir con los términos y condiciones de MercadoPago. No almacenamos ni tenemos acceso a 
            los datos de pago proporcionados durante la transacción. Si tienes algún problema o disputa relacionada con el pago, te recomendamos que te pongas en contacto directamente 
            con MercadoPago para recibir asistencia.
          </p>
        </li>
      </ol>
    </section>
  )
}

export default PreguntasFrecuentes
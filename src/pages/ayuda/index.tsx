import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Layout from "@/components/Layout/Layout"
import TerminosCondiciones from "@/components/Ayuda/TerminosCondiciones"
import PoliticasPrivacidad from "@/components/Ayuda/PoliticasPrivacidad"
import PoliticasCookies from "@/components/Ayuda/PoliticasCookies"
import PreguntasFrecuentes from "@/components/Ayuda/PreguntasFrecuentes"

enum Views {
  TERMINOS_CONDICIONES= 'terminos',
  POLITICAS_PRIVACIDAD= 'privacidad',
  POLITICAS_COOKIES= 'cookies',
  PREGUNTAS_FRECUENTES= 'preguntas',
}

export default function Ayuda() {
  const router = useRouter()

  const { view } = router.query

  return (
    <Layout title="Ayuda">
      <div className='mx-auto py-4 w-5/6 md:grid md:grid-cols-5 xl:grid-cols-7 min-h-[calc(100vh-20rem)]'>
        <aside className='md:col-span-2 xl:col-span-2 flex flex-col md:sticky md:top-28 md:h-fit'>
          <Link href={`/ayuda?view=${Views.TERMINOS_CONDICIONES}`} className={`w-fit ${view === Views.TERMINOS_CONDICIONES && 'font-black text-verde'}`}>Términos y condiciones</Link>
          <Link href={`/ayuda?view=${Views.POLITICAS_PRIVACIDAD}`} className={`w-fit ${view === Views.POLITICAS_PRIVACIDAD && 'font-black text-verde'}`}>Políticas de privacidad</Link>
          <Link href={`/ayuda?view=${Views.POLITICAS_COOKIES}`} className={`w-fit ${view === Views.POLITICAS_COOKIES && 'font-black text-verde'}`}>Políticas de Cookies</Link>
          <Link href={`/ayuda?view=${Views.PREGUNTAS_FRECUENTES}`} className={`w-fit ${view === Views.PREGUNTAS_FRECUENTES && 'font-black text-verde'}`}>Preguntas frecuentes</Link>
        </aside>
        <div className="md:col-span-3 xl:col-span-5 mt-6 md:mt-0">
          {view === Views.TERMINOS_CONDICIONES && <TerminosCondiciones />}
          {view === Views.POLITICAS_PRIVACIDAD && <PoliticasPrivacidad />}
          {view === Views.POLITICAS_COOKIES && <PoliticasCookies />}
          {view === Views.PREGUNTAS_FRECUENTES && <PreguntasFrecuentes />}
        </div>
      </div>
    </Layout>
  )
}

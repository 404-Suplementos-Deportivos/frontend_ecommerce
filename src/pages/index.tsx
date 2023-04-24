import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import Layout from "@/components/Layout/Layout"
import SliderBanners from "@/components/Home/SliderBanners"
import SliderProductos from "@/components/Home/SliderProductos"
import EnvioIcon from '/public/icons/EnvioIcon.png'
import CreditCardIcon from '/public/icons/CreditCardIcon.png'
import SecurityIcon from '/public/icons/SecurityIcon.png'
import { ShoppingBagIcon, UsersIcon, ArchiveBoxIcon, GlobeAmericasIcon } from "@heroicons/react/24/outline"
import { useAppDispatch } from "@/hooks/useReduxStore"
import { getProductsAsync } from "@/store/features/product/productsSlice"

interface HomeState {
  ventas: number
  clientes: number
  items: number
  marcas: number
}

const INITIAL_STATE: HomeState = {
  ventas: 0,
  clientes: 0,
  items: 0,
  marcas: 0
}

const MAX_VENTAS = 2000;
const MAX_CLIENTES = 1150;
const MAX_ITEMS = 750;
const MAX_MARCAS = 100;

export default function Home() {
  const dispatch = useAppDispatch()
  const [state, setState] = useState<HomeState>(INITIAL_STATE)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".animate").forEach((element: any, index: number) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          x: -100,
        },
        {
          // opacity: 1,
          // x: 0,
          // duration: 0.5,
          // delay: index * 0.5,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 50%",
            toggleActions: "play none none reverse",
            onLeaveBack: () => gsap.set(element, { opacity: 0, x: -100 }),
            onEnter: () => gsap.to(element, {
              opacity: 1,
              x: 0,
              duration: 0.5,
              delay: index * 0.5,
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 50%",
              }
            }),
          },
        }
      );
    });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".animate-ventas").forEach((element: any, index: number) => {
      gsap.fromTo(
        element,
        {
          opacity: 1,
        },
        {
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 50%",
            toggleActions: "play none none reverse",
            onEnter: () => gsap.to(element, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: index * 0.5,
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 50%",
              },
              onStart: () => {
                // aumentar el valor de ventas de 0 a 2000, de clientes de 0 a 1000, de items de 0 a 5000 y de marcas de 0 a 100, del state
                const interval = setInterval(() => {
                  setState(prevState => ({
                    ...prevState,
                    ventas: Math.min(prevState.ventas + 10, MAX_VENTAS),
                    clientes: Math.min(prevState.clientes + 10, MAX_CLIENTES),
                    items: Math.min(prevState.items + 5, MAX_ITEMS),
                    marcas: Math.min(prevState.marcas + 1, MAX_MARCAS),
                  }))
                }, 1)
              },
            }),
          },
        }
      );
    });
  }, []);

  useEffect(() => {
    dispatch(getProductsAsync({categoria: undefined, subcategoria: undefined}))
  }, [dispatch])

  return (
    <Layout
      title="Inicio"
    >
      <section className="mb-16">
        <SliderBanners />
      </section>

      <section className="mb-16 bg-grisClaro w-full">
        <div className="mx-auto w-5/6 flex flex-col gap-20 md:flex-row py-16 md:justify-center md:items-center text-grisMuyClaro">
          <div className="flex flex-row gap-4 items-center md:justify-center animate envio-container">
            <Image src={EnvioIcon} alt="Envío gratis" width={80} height={80} />
            <div>
              <p className="font-bold text-xl">
                Realizamos envíos a todo el país
              </p>
              <p className="font-light">
                Entregas en Córdoba en 24 hs.
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-4 items-center md:justify-center animate tarjetas-container">
            <Image src={CreditCardIcon} alt="Tarjetas Crédito" width={80} height={80} />
            <div>
              <p className="font-bold text-xl">
                Todas las tarjeras de crédito
              </p>
              <p className="font-light">
              3 pagos sin interés.
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-4 items-center md:justify-center animate compras-container">
            <Image src={SecurityIcon} alt="Compra Segura" width={80} height={80} />
            <div>
              <p className="font-bold text-xl">
                Compra segura
              </p>
              <p className="font-light">
                Protección de tus datos asegurada.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="mb-16 mx-auto w-5/6">
        <h1 className="font-bold text-5xl">Nuestros Productos</h1>
        <SliderProductos />
        <div className="w-full">
          <Link href="/products" className="mx-auto bg-grisClaro text-blanco py-2 px-6 mt-5 text-center block w-full md:w-fit transition-colors duration-300 ease-in-out hover:bg-amarillo">Ver todos los productos</Link>
        </div>
      </main>

      <section className="mb-16">

      </section>

      <section className="mb-16 bg-grisOscuro">
        <div className="mx-auto w-5/6 flex flex-col gap-10 md:gap-20 md:flex-row py-16 justify-center items-center text-grisMuyClaro">
          <div className="flex flex-col gap-2 items-center justify-center bg-grisMedio py-8 w-40 rounded-md">
            <ShoppingBagIcon className="w-16 h-1w-16 text-amarillo" />
            <p className="font-bold text-xl text-amarillo animate-ventas">
              +{state.ventas}
            </p>
            <p className="font-light">
              Ventas realizadas.
            </p>
          </div>

          <div className="flex flex-col gap-2 items-center justify-center bg-grisMedio py-8 w-40 rounded-md">
            <UsersIcon className="w-16 h-1w-16 text-amarillo" />
            <p className="font-bold text-xl text-amarillo animate-ventas">
              +{state.clientes}
            </p>
            <p className="font-light">
              Clientes satisfechos.
            </p>
          </div>

          <div className="flex flex-col gap-2 items-center justify-center bg-grisMedio py-8 w-40 rounded-md">
            <ArchiveBoxIcon className="w-16 h-1w-16 text-amarillo" />
            <p className="font-bold text-xl text-amarillo animate-ventas">
              +{state.items}
            </p>
            <p className="font-light">
              Items en stock.
            </p>
          </div>

          <div className="flex flex-col gap-2 items-center justify-center bg-grisMedio py-8 w-40 rounded-md">
            <GlobeAmericasIcon className="w-16 h-1w-16 text-amarillo" />
            <p className="font-bold text-xl text-amarillo animate-ventas">
              +{state.marcas}
            </p>
            <p className="font-light">
              Marcas.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}
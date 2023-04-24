import Layout from "@/components/Layout/Layout"
import Image from "next/image"
import ErrorImage from '/public/images/Error404.svg'

export default function ErrorPage() {
  return (
    <Layout
      title="Error 404"
      description="Página no encontrada"
    >
      <div className="w-full h-full py-14 flex flex-col items-center justify-center">
        <Image src={ErrorImage} alt="Error 404" width={500} height={500} />
        <h3 className="text-3xl font-bold">404 - Página no encontrada</h3>
      </div>
    </Layout>
  )
}

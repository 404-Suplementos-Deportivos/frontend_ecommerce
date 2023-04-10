import { Grid } from '@nextui-org/react'
import Layout from "@/components/Layout/Layout"
import EditForm from '@/components/Login/EditForm'

export default function EditPage() {
  return (
    <Layout title="Editar perfil">
      <div className='mx-auto py-4 w-5/6'>
        <Grid.Container gap={2}>
          <Grid xs={4} className='flex flex-col'>
            <h3>Editar perfil</h3>
            <h3>Cambiar contraseña</h3>
            <h3>Historial de Compras</h3>
          </Grid>
          <Grid xs={8}>
            <EditForm />
          </Grid>
        </Grid.Container>
      </div>
    </Layout>
  )
}

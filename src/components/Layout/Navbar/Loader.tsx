import { Loading } from '@nextui-org/react'

const Loader = () => {
  return (
    <div className='bg-grisMuyClaro flex flex-col justify-center items-center h-screen relative inset-0'>
      <p className='logo mb-5'>404</p>
      <Loading color="success"></Loading>
    </div>
  )
}

export default Loader
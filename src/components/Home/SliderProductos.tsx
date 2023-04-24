import { useRef, useState } from "react"
import Card from "../Products/Card"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useAppSelector } from "@/hooks/useReduxStore"
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";

const SliderProductos = () => {
  const { productos } = useAppSelector(state => state.productos)
  const isSmallScreen = useIsSmallScreen(768)
  const listProductos = productos.slice(0, 12)

  return (
    <Swiper
      slidesPerView={isSmallScreen ? 1 : 3}
      spaceBetween={30}
      modules={[Navigation]}
      className="mt-5"
      loop={true}
    >
      {listProductos.map(producto => (
        <SwiperSlide key={producto.id}>
          <Card producto={producto} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SliderProductos
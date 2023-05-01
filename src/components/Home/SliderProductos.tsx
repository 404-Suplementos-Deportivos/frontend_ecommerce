import { useRef, useState } from "react"
import Card from "../Products/Card"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useAppSelector } from "@/hooks/useReduxStore"
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";

const SliderProductos = () => {
  const { productos } = useAppSelector(state => state.productos)
  const isSmallScreen = useIsSmallScreen(768)
  const listProductos = productos.slice(0, 12)

  if(!listProductos.length) return null
  return (
    <Swiper
      slidesPerView={isSmallScreen ? 1 : 4}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        stopOnLastSlide: false,
      }}
      modules={[Autoplay]}
      className="mt-5"
    >
      {listProductos.map((producto, index) => (
        <SwiperSlide key={index}>
          <Card producto={producto} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SliderProductos
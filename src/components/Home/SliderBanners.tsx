import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Slider01 from '/public/images/Slider01.webp'
import Slider02 from '/public/images/Slider02.webp'
import Slider03 from '/public/images/Slider03.webp'
import Slider04 from '/public/images/Slider04.webp'
import Slider05 from '/public/images/Slider05.webp'
import Slider06 from '/public/images/Slider06.webp'

const SliderBanners = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      centeredSlides={true}
      loop={true}
      effect={"fade"}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        stopOnLastSlide: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[EffectFade, Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <Image src={Slider01} alt="Slider 01" priority={true} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={Slider02} alt="Slider 02" priority={true} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={Slider03} alt="Slider 03" priority={true} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={Slider04} alt="Slider 04" priority={true} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={Slider05} alt="Slider 05" priority={true} />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={Slider06} alt="Slider 06" priority={true} />
      </SwiperSlide>
    </Swiper>
  )
}

export default SliderBanners
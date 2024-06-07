import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { AspectRatio, Image } from '@chakra-ui/react';

export default function App() {
  return (
    <>
      <Swiper
         spaceBetween={30}
         centeredSlides={true}
         autoplay={{
           delay: 3500,
           disableOnInteraction: false,
         }}
         pagination={{
           clickable: true,
         }}
         navigation={true}
         modules={[Autoplay, Pagination, Navigation]}
      >
        <SwiperSlide>
          <AspectRatio maxW="max-w-screen-xl" ratio={16 / 4}>
            <Image src="/rabbit_nobg.png" width="50%" alt="naruto" objectFit="cover" />
          </AspectRatio>
        </SwiperSlide>
        <SwiperSlide>
          <AspectRatio maxW="max-w-screen-xl" ratio={16 / 4}>
            <Image src="/yinglong_nobg.png" width="50%" alt="naruto" objectFit="cover" />
          </AspectRatio>
        </SwiperSlide>
        <SwiperSlide>
          <AspectRatio maxW="max-w-screen-xl" ratio={16 / 4}>
            <Image src="/estech_nogb.png" width="50%" alt="naruto" objectFit="cover" />
          </AspectRatio>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

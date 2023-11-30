
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import image_1 from '../../../assets/bg-2.jpg'
import image_2 from '../../../assets/bg-6.jpg'


const Slider = () => {
    return (
        <div>
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect={'fade'}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div>
            <img src={image_1} className='w-full h-72 md:h-screen object-cover z-10'/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={image_2} className='w-full h-72 md:h-screen object-cover'/>
        </SwiperSlide>
      </Swiper>
            
        </div>
    );
};

export default Slider;
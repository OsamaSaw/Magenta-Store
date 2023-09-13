import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const MainCarousel = ({
  carouselImages,
}: {
  carouselImages: string[];
}) => {
  if (!carouselImages) return <div>Loading</div>;
  //   const swiperRef = useRef();
  return (
    <div className="w-[60%] mr-auto ml-auto bg-[#fff] rounded-b-lg">
      <div className="w-[60%]">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper select-none"
        >
          {carouselImages.map((item, index) => (
            <SwiperSlide key={index}>
              <img className="h-[630px]" src={item}></img>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

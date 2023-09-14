import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useWindowSize } from "components/header/useWindowSize";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

export const MainCarousel = ({
  carouselImages,
}: {
  carouselImages: string[];
}) => {
  if (!carouselImages) return <div>Loading</div>;
  //   const swiperRef = useRef();
  const size = useWindowSize();
  return (
    <div
      className={`mr-auto ml-auto ${
        size.width < 767 ? "pt-10 w-full" : "w-[60%]"
      }`}
    >
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
            <Link href={`product/${index + 1}`}>
              <img className="h-fit" src={item}></img>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider() {
  const banners = [
    {
      image: "/banner/banner1.jpg",
      title: "Latest Fashion Collection",
      subtitle: "Discover premium products",
    },
    {
      image: "/banner/banner2.jpg",
      title: "Big Summer Sale",
      subtitle: "Up to 50% OFF",
    },
    {
      image: "/banner/banner3.jpg",
      title: "New Arrivals",
      subtitle: "Trending products available now",
    },
  ];

  return (
    <div className="mb-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[250px] sm:h-[350px] md:h-[500px]">
              
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
                
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4">
                  {banner.title}
                </h1>

                <p className="text-sm sm:text-lg md:text-2xl">
                  {banner.subtitle}
                </p>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider() {
  const banners = [
    {
      image: "/banner/banner1.jpg",
      kicker: "New season",
      title: "Latest fashion collection",
      subtitle: "Discover premium products",
    },
    {
      image: "/banner/banner2.jpg",
      kicker: "Limited time",
      title: "Big summer sale",
      subtitle: "Up to 50% off",
    },
    {
      image: "/banner/banner3.jpg",
      kicker: "Just dropped",
      title: "New arrivals",
      subtitle: "Trending products available now",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500 }}
        pagination={{ clickable: true }}
        loop
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[300px] sm:h-[400px] md:h-[560px]">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,11,16,0.3) 0%, rgba(11,11,16,0.75) 100%)",
                }}
              />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                <span className="text-[#33E6CC] text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-4">
                  {banner.kicker}
                </span>

                <h1
                  className="text-white text-3xl sm:text-5xl md:text-7xl font-bold mb-4 leading-[1.05] tracking-tight"
                  style={{ fontFamily: "var(--font-display, sans-serif)" }}
                >
                  {banner.title}
                </h1>

                <p className="text-[#C8C8D2] text-sm sm:text-lg md:text-xl mb-8">
                  {banner.subtitle}
                </p>

                <Link href="/product">
                  <button
                    className="text-[#0B0B10] font-semibold px-7 py-3 rounded-xl text-sm md:text-base transition hover:scale-[1.03]"
                    style={{
                      background: "linear-gradient(90deg, #7C5CFC, #33E6CC)",
                    }}
                  >
                    Shop now
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-pagination-bullet {
          background: #8B8B99;
          opacity: 0.6;
        }
        .swiper-pagination-bullet-active {
          background: linear-gradient(90deg, #7C5CFC, #33E6CC);
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

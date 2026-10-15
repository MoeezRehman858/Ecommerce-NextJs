"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
<<<<<<< HEAD
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
=======
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
>>>>>>> 414d771 (CSS Changes)

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
<<<<<<< HEAD
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500 }}
=======
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={900}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
>>>>>>> 414d771 (CSS Changes)
        pagination={{ clickable: true }}
        loop
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
<<<<<<< HEAD
            <div className="relative h-[300px] sm:h-[400px] md:h-[560px]">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
=======
            <div className="relative h-[320px] sm:h-[420px] md:h-[580px] overflow-hidden">
              <img
                src={banner.image}
                alt={banner.title}
                className="hero-img w-full h-full object-cover"
>>>>>>> 414d771 (CSS Changes)
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
<<<<<<< HEAD
                    "linear-gradient(180deg, rgba(11,11,16,0.3) 0%, rgba(11,11,16,0.75) 100%)",
                }}
              />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                <span className="text-[#33E6CC] text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-4">
=======
                    "linear-gradient(180deg, rgba(13,18,32,0.35) 0%, rgba(13,18,32,0.85) 100%)",
                }}
              />

              <div className="hero-anim absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                <span className="text-brand text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4">
>>>>>>> 414d771 (CSS Changes)
                  {banner.kicker}
                </span>

                <h1
                  className="text-white text-3xl sm:text-5xl md:text-7xl font-bold mb-4 leading-[1.05] tracking-tight"
                  style={{ fontFamily: "var(--font-display, sans-serif)" }}
                >
                  {banner.title}
                </h1>

<<<<<<< HEAD
                <p className="text-[#C8C8D2] text-sm sm:text-lg md:text-xl mb-8">
=======
                <p className="text-soft text-sm sm:text-lg md:text-xl mb-8">
>>>>>>> 414d771 (CSS Changes)
                  {banner.subtitle}
                </p>

                <Link href="/product">
<<<<<<< HEAD
                  <button
                    className="text-[#0B0B10] font-semibold px-7 py-3 rounded-xl text-sm md:text-base transition hover:scale-[1.03]"
                    style={{
                      background: "linear-gradient(90deg, #7C5CFC, #33E6CC)",
                    }}
                  >
=======
                  <button className="text-bg font-semibold px-8 py-3.5 rounded-xl text-sm md:text-base bg-brand hover:bg-brand-hover transition hover:-translate-y-0.5">
>>>>>>> 414d771 (CSS Changes)
                    Shop now
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
<<<<<<< HEAD
        .swiper-pagination-bullet {
          background: #8B8B99;
          opacity: 0.6;
        }
        .swiper-pagination-bullet-active {
          background: linear-gradient(90deg, #7C5CFC, #33E6CC);
          opacity: 1;
=======
        /* Text and image animate in each time a slide becomes active */
        .swiper-slide-active .hero-anim > * {
          animation: rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
        }
        .swiper-slide-active .hero-anim > *:nth-child(2) { animation-delay: 0.12s; }
        .swiper-slide-active .hero-anim > *:nth-child(3) { animation-delay: 0.24s; }
        .swiper-slide-active .hero-anim > *:nth-child(4) { animation-delay: 0.36s; }
        .swiper-slide-active .hero-img {
          animation: kenburns 9s ease-out forwards;
        }

        .swiper-pagination-bullet {
          background: #98a2b8;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #ff8a3d;
          opacity: 1;
          width: 26px;
          border-radius: 6px;
>>>>>>> 414d771 (CSS Changes)
        }
      `}</style>
    </div>
  );
}

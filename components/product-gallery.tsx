"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function ProductGallery({images,name}:{images:string[];name:string}){
  if(!images.length)return <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-black/10 bg-[radial-gradient(circle_at_top_right,#ffffff,transparent_50%),linear-gradient(135deg,#f5f5f5,#dedede)]"><div className="absolute inset-0 grid place-items-center"><div className="h-44 w-3/5 rounded-[4rem] border border-white/15 bg-black/80 shadow-[0_30px_100px_rgba(0,0,0,.2)]"><div className="mx-auto mt-7 h-1/2 w-[88%] rounded-[3rem] bg-[radial-gradient(circle,#ffffff33_1px,transparent_1.5px)] [background-size:6px_6px]"/></div></div></div>;
  return <div className="product-gallery overflow-hidden rounded-[2rem] border border-black/10 bg-[#f6f6f6]"><Swiper modules={[Navigation,Pagination]} navigation={images.length>1} pagination={images.length>1?{clickable:true}:false} loop={images.length>1} className="aspect-square">{images.map((image,index)=><SwiperSlide key={`${image}-${index}`}><img src={image} alt={`${name} - ảnh ${index+1}`} className="h-full w-full object-cover"/></SwiperSlide>)}</Swiper></div>
}

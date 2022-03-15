import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay, Navigation } from "swiper/core";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import WelfareCard from "../WelfareCard";

SwiperCore.use([Pagination, Autoplay, Navigation]);

function Slide() {
  return (
    <main className="ExampleComponent">
      <div className="main-wrap">
        <h1>USER님에게 추천하는 복지</h1>
        <Swiper
          style={{
            width: "70vw",
            height: "40vh",
            backgroundColor: "#FFF5F1",
            borderRadius: "12px",
          }}
          spaceBetween={8}
          slidesPerView={3}
          initialSlide={1}
          navigation
          scrollbar={{ draggable: true }}
          pagination={{
            clickable: true,
          }}
          loop
          autoplay={{ delay: 3000 }}
        >
          <SwiperSlide>
            <WelfareCard />
          </SwiperSlide>
          <SwiperSlide>
            <WelfareCard />
          </SwiperSlide>
          <SwiperSlide>
            <WelfareCard />
          </SwiperSlide>
          <SwiperSlide>
            <WelfareCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </main>
  );
}
export default Slide;

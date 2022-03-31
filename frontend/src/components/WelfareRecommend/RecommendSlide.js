import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay, Navigation } from "swiper/core";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import RecommendCard from "./RecommendCard";
import getAxios from "../../api";

SwiperCore.use([Pagination, Autoplay, Navigation]);

function RecommendSlide(props) {
  const axios = getAxios();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        // const request = await axios.get('/api/welfare/');
      } catch (err) {
        console.log(err);
      }
    };
    fetchCard();
  }, []);

  return (
    <div className="main-wrap">
      <h2 style={{ marginBottom: "3vh", fontWeight: "600" }}>
        {props.name}님에게 추천하는 복지
      </h2>
      <Swiper
        style={{
          width: "70vw",
          height: "35vh",
          borderRadius: "12px",
        }}
        spaceBetween={8}
        slidesPerView={4}
        initialSlide={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop
        autoplay={{ delay: 2000 }}
      >
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <RecommendCard
            style={{ alignItems: "center", border: "1px solid" }}
          />
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <RecommendCard />
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <RecommendCard />
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <RecommendCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
export default RecommendSlide;

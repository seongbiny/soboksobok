import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay, Navigation } from "swiper/core";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import FilterCard from "./FilterCard";
import getAxios from "../../api";

SwiperCore.use([Pagination, Autoplay, Navigation]);

function FilterSlide(props) {
  const axios = getAxios();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const request = await axios.get("/api/welfare/recommend");
        console.log(request.data.body.welfare);
        setCards(request.data.body.welfare);
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
        {cards.map(card => (
          <SwiperSlide
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            key={card.welfareId}
          >
            <FilterCard
              style={{
                alignItems: "center",
              }}
              name={card.welfare_service_name}
              content={card.welfare_service_content}
              id={card.welfareId}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default FilterSlide;

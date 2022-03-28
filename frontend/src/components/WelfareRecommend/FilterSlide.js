import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay, Navigation } from "swiper/core";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styled from "styled-components";
import FilterCard from "./FilterCard";
import getAxios from "../../api";

SwiperCore.use([Pagination, Autoplay, Navigation]);

const StyledBox = styled.div`
  // border: 1px solid;
  width: 80vw;
`;

function FilterSlide() {
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
    <StyledBox>
      <div className="main-wrap">
        <h1 style={{ marginBottom: "5vh" }}>USER님에게 추천하는 복지</h1>
        <Swiper
          style={{
            width: "80vw",
            height: "40vh",
            // backgroundColor: "#FFF5F1",
            borderRadius: "12px",
            // border: "1px solid",
          }}
          spaceBetween={8}
          slidesPerView={3}
          initialSlide={1}
          navigation
          scrollbar={{ draggable: true }}
          loop
          // pagination={{
          //   clickable: true,
          // }}
          // autoplay={{ delay: 3000 }}
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
                style={{ alignItems: "center", border: "1px solid" }}
                name={card.welfare_service_name}
                content={card.welfare_service_content}
                id={card.welfareId}
              />
            </SwiperSlide>
          ))}
          {/* <SwiperSlide
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FilterCard />
          </SwiperSlide>
          <SwiperSlide
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FilterCard />
          </SwiperSlide>
          <SwiperSlide
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FilterCard />
          </SwiperSlide> */}
        </Swiper>
      </div>
    </StyledBox>
  );
}
export default FilterSlide;

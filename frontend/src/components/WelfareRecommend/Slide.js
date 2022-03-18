import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay, Navigation } from "swiper/core";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import WelfareCard from "../WelfareCard";
import styled from "styled-components";

SwiperCore.use([Pagination, Autoplay, Navigation]);

const StyledBox = styled.div`
  // border: 1px solid;
  width: 80vw;
`;

function Slide() {
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
          <SwiperSlide
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <WelfareCard
              style={{ alignItems: "center", border: "1px solid" }}
            />
          </SwiperSlide>
          <SwiperSlide
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <WelfareCard />
          </SwiperSlide>
          <SwiperSlide
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <WelfareCard />
          </SwiperSlide>
          <SwiperSlide
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <WelfareCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </StyledBox>
  );
}
export default Slide;

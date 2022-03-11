import React from "react";
import Slider from "react-slick";
import WelfareCard from "../WelfareCard";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  slidesToScroll: 1,
};

function Slide() {
  return (
    <div>
      <h2>추천복지</h2>
      <Slider {...settings}>
        <WelfareCard />
        <WelfareCard />
        <WelfareCard />
        <WelfareCard />
        <WelfareCard />
        <WelfareCard />
        <WelfareCard />
      </Slider>
    </div>
  );
}
export default Slide;

import React from "react";
import { Carousel } from "antd";
import pareja1 from "../Img/pareja-1.jpg";
import pareja2 from "../Img/pareja-2.jpg";

/*const contentStyle = {
  height: "25rem",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};*/

const CarouselComponent = () => (
  <Carousel autoplay>
    <div className="container-img">
      <img src={pareja1} alt="Imagen de pareja"></img>
    </div>
    <div className="container-img">
      <img src={pareja2} alt="Imagen de pareja"></img>
    </div>
  </Carousel>
);

export default CarouselComponent;

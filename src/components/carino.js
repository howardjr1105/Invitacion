import { BsEnvelopePaperHeart } from "react-icons/bs";
import Lottie from "react-lottie";
import Dinner from "../static/Dinner-animated.json";

const carino = () => {
  const DinnerData = {
    loop: true,
    autoplay: true,
    animationData: Dinner,
  };
  return (
    <div className="carino">
      <h4>Muestras de cariño en efectivo</h4>
      <Lottie options={DinnerData} height={100} width={100} />
      <BsEnvelopePaperHeart />
    </div>
  );
};

export default carino;

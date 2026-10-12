import { useProgress } from "@react-three/drei";

const Preloader = () => {
  const { progress } = useProgress();

  return (
    <div className="preloader">
      <img src="./assets/logoWhite.png" className="logoPreloader" />
      <div className="spinner"></div>
    </div>
  );
};

export default Preloader;

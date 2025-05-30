import { Circles } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <Circles height="80" width="80" color="black" visible={true} />
    </div>
  );
};

export default Loader;

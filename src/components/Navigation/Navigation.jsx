import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header className={css.header}>
      <nav className={css.navigationContainer}>
        <NavLink to="/" className={css.link}>
          HOME
        </NavLink>
        <NavLink to="/movies" className={css.link}>
          MOVIES
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;

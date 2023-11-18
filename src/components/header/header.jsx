import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import PersonPhoto from "../../assets/person.svg";
import CartPhoto from "../../assets/cart.svg";
import styles from "./header.module.css";

function Header() {
  const [isMenuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!isMenuActive);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.burgerMenu} onClick={toggleMenu}>
        ☰
      </div>
      <div className={`${styles.nav} ${isMenuActive ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/home" className={styles.home}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/collection" className={styles.collection}>
              Collection
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.about}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className={styles.contact}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.logo}>
        <img src={Logo} alt="logo" />
      </div>
      <div className={styles.search}>
        <img src={PersonPhoto} alt="" />
        <img src={CartPhoto} alt="" />
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
}

export default Header;

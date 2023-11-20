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

  const closeMenu = () => {
    setMenuActive(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.burgerMenu} onClick={toggleMenu}>
        ☰
      </div>
      {isMenuActive && (
        <div className={styles.modalOverlay} onClick={closeMenu}>
          <div className={styles.modal}>
            <div className={styles.closeButton} onClick={closeMenu}>
              &times;
            </div>
            <div className={styles.burgerMenuList}>
              <ul>
                <li>
                  <Link to="/home" className={styles.link} onClick={closeMenu}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collection"
                    className={styles.link}
                    onClick={closeMenu}
                  >
                    Collection
                  </Link>
                </li>
                <li>
                  <Link to="/about" className={styles.link} onClick={closeMenu}>
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className={styles.link}
                    onClick={closeMenu}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className={styles.logo}>
        <img src={Logo} alt="logo" />
      </div>
      <div className={`${styles.nav} ${isMenuActive ? styles.active : ""}`}>
        <ul>
          <li>
            <Link to="/home" className={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/collection" className={styles.link}>
              Collection
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.link}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className={styles.link}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.search}>
        <img src={PersonPhoto} alt="" />
        <img src={CartPhoto} alt="" />
      </div>
    </div>
  );
}

export default Header;

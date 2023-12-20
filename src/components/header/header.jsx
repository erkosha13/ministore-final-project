import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import { IoPerson } from "react-icons/io5";
import { RiShoppingCartLine, RiHeart2Line } from "react-icons/ri";
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
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.burgerMenu} onClick={toggleMenu}>
          ☰
        </div>
        {isMenuActive && (
          <div className={styles.modalOverlay} onClick={closeMenu}>
            <div className={styles.modal}>
              <div className={styles.burgerMenuList}>
                <ul>
                  <li>
                    <Link to="/" className={styles.link} onClick={closeMenu}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/catalog"
                      className={styles.link}
                      onClick={closeMenu}
                    >
                      Catalog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className={styles.link}
                      onClick={closeMenu}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contacts"
                      className={styles.link}
                      onClick={closeMenu}
                    >
                      Contacts
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
              <Link to="/" className={styles.link}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/catalog" className={styles.link}>
                Catalog
              </Link>
            </li>
            <li>
              <Link to="/about" className={styles.link}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contacts" className={styles.link}>
                Contacts
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.search}>
          <ul>
            <li>
              <Link to="/login" className={styles.link}>
                {" "}
                <IoPerson />
              </Link>
            </li>
            <li>
              <Link to="cart" className={styles.link}>
                {" "}
                <RiShoppingCartLine />{" "}
              </Link>
            </li>
            <li>
              <Link to="wishlist" className={styles.link}>
                <RiHeart2Line />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;

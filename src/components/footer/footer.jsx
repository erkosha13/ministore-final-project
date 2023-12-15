import { useState, useEffect } from "react";
import styles from "./footer.module.css";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { AiFillUpCircle } from "react-icons/ai";

function Footer() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const isTop = window.scrollY < 100;
    if (isTop !== isScrolled) {
      setIsScrolled(isTop);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  return (
    <div className={`${styles.wrapper} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.content}>
        <div className={styles.logos}>
          <a href="https://github.com/erkosha13">
            <FaGithub />
          </a>
          <a href="https://github.com/erkosha13">
            <FaLinkedin />
          </a>
        </div>
        <div className={styles.centerText}>
          <p>Qamalladin University</p>
        </div>
        <div className={styles.text}>
          <p>by Erkosha 13</p>
        </div>
        <div className={styles.buttonUp}>
          <button className={styles.scrollButton} onClick={handleScrollTop}>
            <AiFillUpCircle />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;

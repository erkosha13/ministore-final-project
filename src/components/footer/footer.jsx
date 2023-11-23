import styles from "./footer.module.css";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logos}>
        <a href="https://github.com/erkosha13"><FaGithub /></a>
        <a href="https://github.com/erkosha13"><FaLinkedin /></a>
      </div>
      <div className={styles.centerText}>
        <p>Qamalladin University</p>
      </div>
      <div className={styles.text}>
        <p>by Erkosha 13</p>
      </div>
    </div>
  );
}

export default Footer;

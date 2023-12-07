import styles from './contacts.module.css';
import Imgphoto2 from "../../assets/img/about3.jpg";
import { IoLogoLinkedin, IoLogoGithub, IoLogoInstagram } from "react-icons/io5";

function Contacts() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.history}>
        <div className={styles.info}>
          <div className={styles.text}>
            <h1>MY CONTACT DETAILS</h1>
            <a href="https://www.linkedin.com/in/erkebulan-ualikhan-4b79a1295/">
              <IoLogoLinkedin /> Erkebulan Ualikhan
            </a>
            <a href="https://github.com/erkosha13">
              <IoLogoGithub /> Erkosha13
            </a>
            <a href="https://instagram.com/dreamoferkosha">
              <IoLogoInstagram /> dreamoferkosha
            </a>
          </div>
          <div className={styles.card}>
            <div className={styles.logo}>
              <h1>
                <span>KASPI</span>
                <br /> GOLD
              </h1>
            </div>
            <div className={styles.textCard}>
              <p>4400 4302 4494</p>
            </div>
          </div>
        </div>
        <img src={Imgphoto2} alt="AboutPhoto"></img>
      </div>
    </div>
  );
}

export default Contacts;
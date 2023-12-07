import Imgphoto from "../../assets/img/about1.png";
import Imgphoto1 from "../../assets/img/about2.png";
import styles from "./about.module.css";

function About() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.history}>
        <div>
          <div className={styles.text}>
            <h1>OVERVIEW</h1>
            <p>
              The Mini-Store brand was born in 2023 in Almaty, the eastern
              capital of the country.
            </p>
          </div>
        </div>
        <img src={Imgphoto} alt="AboutPhoto"></img>
      </div>
      <div className={styles.history1}>
        <img src={Imgphoto1} alt="AboutPhoto1" />
        <div className={styles.text}>
          <h1>HISTORY</h1>
          <p>
            The origins of the name lie in its very roots: Mini-Store is
            actually a final project at university.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

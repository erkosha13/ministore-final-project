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
              capital of the country. Since its inception, Mini-Store has been
              committed to providing a unique shopping experience for its
              customers. We believe in offering not just products, but a
              lifestyle that reflects the spirit of the modern era.
            </p>
            <p>
              Our carefully curated selection of items spans fashion, electronics,
              furniture, shoes, and miscellaneous goods. Each product is chosen
              with a focus on quality, style, and functionality to meet the
              diverse needs and preferences of our valued customers.
            </p>
            <p>
              Mini-Store is more than just a retail space; it&rsquo;s a community of
              individuals who appreciate the finer things in life. We invite
              you to explore our store, discover new trends, and join us on a
              journey of style and innovation.
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
            The origins of the Mini-Store name lie in its very roots: Mini-Store
            is more than a retail brand; it is the culmination of a vision that
            began as a final project at university. Driven by a passion for
            innovation and a desire to redefine the shopping experience, the
            founders embarked on a journey to create a space where style meets
            substance.
          </p>
          <p>
            The history of Mini-Store is a tale of dedication, creativity, and
            resilience. From its humble beginnings as a university project to
            becoming a prominent player in the retail industry, Mini-Store has
            evolved with the times, adapting to changing consumer preferences
            while staying true to its core values.
          </p>
          <p>
            Join us as we continue to write the history of Mini-Store, where
            every customer is a part of our story, and together, we shape the
            future of retail.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

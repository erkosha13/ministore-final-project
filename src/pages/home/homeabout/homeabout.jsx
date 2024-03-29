import styles from './homeabout.module.css';

function HomeAbout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.txt}>
        <div className={styles.title}>
          <h1>Relaxed elegance</h1>
        </div>
        <div className={styles.subtitle}>
          <p>Clothes inspired by classic movies that are our brand’s endless source
          of inspiration. Perfectly fitting and highlighting your best features
          – while elegantly hiding the shortcomings. Enjoy our body-friendly
          fabrics and communicate a well thought-out, elegant image of a relaxed
          lifestyle and refinement.</p>
        </div>
      </div>
    </div>
  );
}

export default HomeAbout;
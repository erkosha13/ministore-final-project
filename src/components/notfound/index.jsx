import styles from './notfound.module.css';
import notFoundGif from '../../assets/gif/notfound.gif';
const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h1>
        PAGE NOT FOUND.
        <span>
          <p>
            The page may have been removed, changed, or it is temporarily
            unavailable.
          </p>
        </span>
      </h1>
      <img src={notFoundGif} alt="Not Found"  className={styles.gif}/>
    </div>
  );
};

export default NotFound;

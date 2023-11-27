import { useState } from "react";
import useVideoLogic from "./homeLogic";
import myVideo from "../../assets/start.mp4";
import myVideo1 from "../../assets/video2.mp4";
import myVideo2 from "../../assets/video3.mp4";
import myVideo3 from "../../assets/video4.mp4";
import myVideo4 from "../../assets/video5.mp4";
import styles from "./home.module.css";
import HomeAbout from "../txt/homeabout";
import Collection from "../collection/collection";
import Products from "../paginationhome/paginationHome";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { GoUnmute, GoMute } from "react-icons/go";

const Home = () => {
  const {
    isPlaying,
    isMuted,
    videoRef,
    togglePlayback,
    toggleMute,
  } = useVideoLogic();

  const [controlsVisible, setControlsVisible] = useState(false);

  const randomVideo = () => {
    const videos = [myVideo, myVideo1, myVideo2, myVideo3, myVideo4];
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => setControlsVisible(false)}
    >
      <div
        className={styles.videoContainer}
        onMouseEnter={() => setControlsVisible(true)}
        onMouseLeave={() => setControlsVisible(false)}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          onClick={togglePlayback}
          className={styles.video}
        >
          <source src={randomVideo()} type="video/mp4" />
          Ваш браузер не поддерживает тег video.
        </video>
        {controlsVisible && (
          <div className={`${styles.controls} controls`}>
            <button onClick={togglePlayback}>
              {isPlaying ? <CiPause1 /> : <CiPlay1 />}
            </button>
            <button onClick={toggleMute}>
              {isMuted ? <GoMute /> : <GoUnmute />}
            </button>
          </div>
        )}
      </div>
      <HomeAbout />
      <Collection />
      <Products />
    </div>
  );
};

export default Home;
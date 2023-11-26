import { useState, useEffect, useRef } from "react";
import myVideo from "../../assets/start.mp4";
import styles from "./home.module.css";
import HomeAbout from "../txt/homeabout";
import Collection from "../collection/collection";
import Products from "../paginationhome/paginationHome";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { GoUnmute, GoMute } from "react-icons/go";

function Home() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      setIsMuted(videoRef.current.muted);
    }
  }, []);

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div
        className={styles.videoContainer}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          onClick={togglePlayback}
          className={styles.video}
        >
          <source src={myVideo} type="video/mp4" />
          Ваш браузер не поддерживает тег video.
        </video>
        {showControls && (
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
}

export default Home;

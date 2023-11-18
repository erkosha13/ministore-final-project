import { useState, useRef } from "react";
import myVideo from "../../assets/start.mp4";
import Mute from "../../assets/mute.png";
import Unmute from "../../assets/unmute.png";
import Pause from "../../assets/pause.png";
import Play from "../../assets/play.png";
import styles from "./home.module.css";

function Home() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);

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
              {isPlaying ? (
                <img src={Pause} alt="Pause" />
              ) : (
                <img src={Play} alt="Play" />
              )}
            </button>
            <button onClick={toggleMute}>
              {videoRef.current && videoRef.current.muted ? (
                <img src={Mute} alt="Mute" />
              ) : (
                <img src={Unmute} alt="Unmute" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

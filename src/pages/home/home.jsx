import React, { useState, useRef, useEffect } from "react";
import { GiPauseButton, GiPlayButton } from "react-icons/gi";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import styles from "./home.module.css";

import HomeCatalog from "./home-catalog/homecatalog";
import HomeAbout from "./homeabout/homeabout";
import TopProduct from "./home-top-products";
import myVideo from "../../assets/video/start.mp4";
import myVideo1 from "../../assets/video/video2.mp4";
import myVideo2 from "../../assets/video/video3.mp4";
import myVideo3 from "../../assets/video/video4.mp4";
import myVideo4 from "../../assets/video/video5.mp4";

const videos = [myVideo3, myVideo1, myVideo2, myVideo, myVideo4];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef(
    Array.from({ length: videos.length }, () => React.createRef())
  );

  const handleVideoEnd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handleTogglePlay = () => {
    const video = videoRefs.current[currentIndex].current;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleToggleMute = () => {
    const video = videoRefs.current[currentIndex].current;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSelectVideo = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  useEffect(() => {
    const video = videoRefs.current[currentIndex].current;

    if (isPlaying) {
      video.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    } else {
      video.pause();
    }
  }, [currentIndex, isPlaying]);

  return (
    <section className="Contacts">
      <div className={styles.wrapper}>
        <div className={styles.videoContainer}>
          <video
            ref={videoRefs.current[currentIndex]}
            src={videos[currentIndex]}
            autoPlay={isPlaying}
            controls={false}
            muted
            onClick={handleTogglePlay}
            onEnded={handleVideoEnd}
          />
          <div className={styles.controls}>
            <button onClick={handleTogglePlay}>
              {isPlaying ? <GiPauseButton /> : <GiPlayButton />}
            </button>
            <button onClick={handleToggleMute}>
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
          </div>
          <div className={styles.text}>
            <h1>Mini-Store</h1>
            <p>
              Dive into a world of style and innovation with our curated
              collections. Clothing and tech, crafted with exceptional design.
              Elevate your look, embrace functionality. Welcome to the future of
              shopping!
            </p>
            <h1>2023</h1>
          </div>
          <div className={styles.carousel}>
            {videos.map((video, index) => (
              <button
                key={index}
                onClick={() => handleSelectVideo(index)}
                className={`${
                  index === currentIndex ? styles.active : styles.inactive
                }`}
              >
                |
              </button>
            ))}
          </div>
        </div>
        <HomeCatalog />
        <HomeAbout />
        <TopProduct />
      </div>
    </section>
  );
}

export default Home;

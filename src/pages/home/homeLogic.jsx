import { useState, useEffect, useRef } from "react";

const useVideoLogic = () => {
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

  return {
    isPlaying,
    showControls,
    isMuted,
    videoRef,
    togglePlayback,
    toggleMute,
  };
};

export default useVideoLogic;

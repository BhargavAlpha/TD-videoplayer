import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playTime, setPlayTime] = useState(0);
  const [alertShown, setAlertShown] = useState(false);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const showPlayTime = () => {
    if (!alertShown) {
      alert(`Total watched time: ${localStorage.getItem('playTime')} seconds`);
      setAlertShown(true);
    }
  };

  const updatePlayTime = () => {
    const videoElement = document.getElementById(selectedVideo.id);
    if (videoElement && !videoElement.paused && !videoElement.ended) {
      setPlayTime((prevPlayTime) => {
        const newPlayTime = prevPlayTime + 1;
        if (newPlayTime % 5 === 0) {
          localStorage.setItem('playTime', newPlayTime.toString());
        }
        return newPlayTime;
      });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(updatePlayTime, 1000);
    return () => clearInterval(intervalId);
  }, [selectedVideo]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        showPlayTime();
      } else {
        setAlertShown(false); // Reset alert flag when tab becomes visible again
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className='container'>
      <Sidebar handleVideoClick={handleVideoClick} />
      <div className='video-container'>
        {selectedVideo && (
          <video
            id={selectedVideo.id}
            src={selectedVideo.url}
            controls
            onPause={showPlayTime}
            onEnded={showPlayTime}
            style={{ width: '100%' }}
          ></video>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;

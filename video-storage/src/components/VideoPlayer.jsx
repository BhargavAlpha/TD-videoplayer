import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playTime, setPlayTime] = useState(0);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const showPlayTime = () => {
    alert(`Total watched time: ${localStorage.getItem('playTime')} seconds`);
  };

  const updatePlayTime = () => {
    const videoElement = document.getElementById(selectedVideo.id);
    if (document.visibilityState === 'visible' && videoElement && !videoElement.paused && !videoElement.ended) {
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
    if (selectedVideo) {
      const intervalId = setInterval(updatePlayTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [selectedVideo]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        showPlayTime();
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

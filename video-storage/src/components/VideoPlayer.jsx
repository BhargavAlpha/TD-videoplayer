import React, { useState, useEffect, useRef } from 'react';
import './VideoPlayer.css';

function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState('');
  const [watchedTime, setWatchedTime] = useState(0);
  const videoRef = useRef(null);
  const lastLogged = useRef(0); 

  useEffect(() => {
    setVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4');
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      showTotalWatchedTimeAlert();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (watchedTime % 5 === 0) {
      localStorage.setItem('watchedTime', watchedTime);
    }
  }, [watchedTime]);

  useEffect(() => {
    const isActive = () => {
      if (document.visibilityState === 'hidden') {
        showTotalWatchedTimeAlert();
      }
    };

    document.addEventListener('visibilitychange', isActive);

    return () => {
      document.removeEventListener('visibilitychange', isActive);
    };
  }, []);

  function handleProgress() {
    const currentTime = videoRef.current.currentTime;
    const segments = videoRef.current.played;
    let totalWatchedTime = 0;
    for (let i = 0; i < segments.length; i++) {
      totalWatchedTime += segments.end(i) - segments.start(i);
    }

    setWatchedTime(Math.floor(totalWatchedTime));
    
    lastLogged.current = currentTime;
  }

  function showTotalWatchedTimeAlert() {
    alert(`Total watched time: ${localStorage.getItem('watchedTime')} seconds`);
  }

  function handleVideoEnd() {
    showTotalWatchedTimeAlert();
  }


  return (
    <div className='container'>
      {videoUrl ? (
        <video
          ref={videoRef}
          controls
          autoPlay
          onTimeUpdate={handleProgress}
          onPause={showTotalWatchedTimeAlert}
          onEnded={handleVideoEnd}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}

export default VideoPlayer;

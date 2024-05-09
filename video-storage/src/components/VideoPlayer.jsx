import React, { useState, useEffect } from 'react';
import './VideoPlayer.css';

const VideoPlayer=()=>{
  const [selectedVideo, setSelectedVideo]=useState(null);
  const [playTime, setPlayTime]=useState(0); 

  const handleVideoClick=(video)=>{
    setSelectedVideo(video);
  };

  const updatePlayTime=()=>{
    const videoElement = document.getElementById(selectedVideo === 'video1'?'video1':'video2');
    if (videoElement && !videoElement.paused && !videoElement.ended) {
      setPlayTime(prevPlayTime => {
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
      const videoElement = document.getElementById(selectedVideo === 'video1' ? 'video1' : 'video2');
      const intervalId = setInterval(updatePlayTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [selectedVideo]);

  return (
    <div className='container'>
      <div className='sidebar'>
        <button onClick={()=>handleVideoClick('video1')}>Video 1</button>
        <button onClick={()=>handleVideoClick('video2')}>Video 2</button>
      </div>

      {/* Video container */}
      <div className='video-container'>
        {selectedVideo === 'video1' && (
          <video
            id='video1'
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            controls
            style={{ width: '100%' }}
          ></video>
        )}
        {selectedVideo==='video2' && (
          <video
            id='video2'
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            controls
            style={{ width: '100%' }}
          ></video>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;

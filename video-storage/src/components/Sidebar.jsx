import React from 'react'

function Sidebar({ handleVideoClick}) {
 const videos=[
    {
        id:'video1',
        url:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
        },
        {
        id:'video2',
        url:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' 
    }
 ]
  return (
    <div className='sidebar'>
        {videos.map(video => (
          <button key={video.id} onClick={() => handleVideoClick(video)}>{video.id}</button>
        ))}
    </div>
  )
}

export default Sidebar
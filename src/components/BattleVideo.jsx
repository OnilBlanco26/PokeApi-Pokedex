import React from 'react';

function VideoPlayer() {

  const array = ["../Home/batalla2.gif", "../Home/batalla3.gif", "../Home/batalla4.gif", "../Home/batalla5.gif", "../Home/batalla6.gif", "../Home/batalla7.gif"]

  const getRandomFromArray = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  const [video, setVideo] = React.useState(getRandomFromArray(array));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setVideo(getRandomFromArray(array));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  

  return (
    <>
    <img className='video-live' src={video} alt="" />
    </>
  );
}

export default VideoPlayer;
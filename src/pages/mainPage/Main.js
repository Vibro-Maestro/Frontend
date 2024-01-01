import './Main.css';  
import React, { useEffect, useState } from 'react';  

const Main = () => {     
  const [verticalHeight, setVerticalHeight] = useState(0); 
  useEffect(() => {
    function measureAndDisplayHeight() {
      const newVerticalHeight = window.innerHeight;
      setVerticalHeight(newVerticalHeight); 
    }

    measureAndDisplayHeight(); 
    window.addEventListener('resize', measureAndDisplayHeight);

    return () => {
      window.removeEventListener('resize', measureAndDisplayHeight);
    };
  }, []);

  return (
    <>
    <div className="mainPage">
      <img
        className="mainPageBackGround" 
        src={`${process.env.PUBLIC_URL}/img/mainBackGround.png`}
        alt="Main Background"
        style={{ height: `${verticalHeight}px` }}
      />

      <div className="mainPageLogo">Vibro Maestro</div>
      <div className="mainPageSubtitle">
        Musical instrument learning tool<br />
        　 for the hearing impaired
      </div>
      
      <div className="buttonGroup">
        <button className="playButton">Play</button>
        <button className="playButton">Listen</button>
        <button className="playButton">Gallery</button>
      </div>
    </div>
    </>
  );
}

export default Main;
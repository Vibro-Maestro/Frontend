import './Main.css';  
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';  

const Main = () => {     
  const [verticalHeight, setVerticalHeight] = useState(0); 

  const navigate = useNavigate(); 
  const handleClick = (path) => {
    navigate(path);
  };

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
        src={`${process.env.PUBLIC_URL}/img/mainBackGroundWithNoMelody.png`}
        alt="Main Background"
        style={{ height: `${verticalHeight}px` }}
      />
      <img
        className="melody8thNote" 
        src={`${process.env.PUBLIC_URL}/img/icons8-음표-60.png`} 
      />
      <img
        className="melody2ndNoteBig" 
        src={`${process.env.PUBLIC_URL}/img/icons8-음표-48.png`} 
      />
      <img
        className="melody2ndNoteSmall" 
        src={`${process.env.PUBLIC_URL}/img/icons8-음표-24.png`} 
      />
      

      <div className="mainPageLogo">Vibro Maestro</div>
      <div className="mainPageSubtitle">
        Musical instrument learning tool<br />
        　 for the hearing impaired
      </div>

      <div className="buttonGroup">
        <button className="playButton" onClick={() => handleClick('/MusicSelect')}>Play</button>
        <button className="ListenButton" onClick={() => handleClick('/MusicSelect')}>Listen</button>
        <button className="GalleryButton" onClick={() => handleClick('/Gallery')}>Gallery</button>
      </div>
    </div>
    </>
  );
}

export default Main;
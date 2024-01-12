import React from 'react';
import './MusicBox.css'
import { useNavigate } from 'react-router-dom';

const MusicBox = () => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };

  return (  
    <div className="music-Box"> 
        <div className="imgWrapper">
          <img
             className="ImageInMusicBox" 
             src={`${process.env.PUBLIC_URL}/img/pinkFlower.jpg`}  
          ></img>
          <div className="Dot">　</div>
        </div> 
        <div className="MusicDescription"> 
            <div className="Player">Bach</div>
            <div className="MusicTitle">Minuet in G major</div>
            <div className="Bpm">105 bpm</div> 
        </div>  
        <div className="ButtonContainer">
            <button className="SelectButton" onClick={() => handleClick('/Play')}>Select</button>
        </div> 
    </div> 
  );
};

export default MusicBox;
  
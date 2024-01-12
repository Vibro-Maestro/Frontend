import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import Box from '../../components/MusicBox';
import './MusicSelectPage.css';

const MusicSelectPage = () => {
  const [verticalHeight, setVerticalHeight] = useState(0);
  const frameRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    function measureAndDisplayHeight() {
      setVerticalHeight(window.innerHeight);
    }

    measureAndDisplayHeight();
    window.addEventListener('resize', measureAndDisplayHeight);

    return () => {
      window.removeEventListener('resize', measureAndDisplayHeight);
    };
  }, []);

  useEffect(() => {
    if (frameRef.current) {
      const list = frameRef.current.children;
      const len = list.length;
      const deg = 360 / len;

      for (let i = 0; i < len; i++) {
        list[i].style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;
      }
    }
  }, [frameRef]);

  return (
    <>
      <Wrapper>
        <div className="musicSelectPage">
          <img
            className="musicSelectPageBackground"
            src={`${process.env.PUBLIC_URL}/img/musicSelectBackground.jpg`}
            style={{ height: `${verticalHeight}px` }}
            alt="Music Select Background"
          />
          <div className="mainPageLogo" style={{ top: '10%' }}>
            Music Select
          </div>
          <div className="home-icon" onClick={() => handleClick('/')}><span className="material-icons">home</span></div>
          <button className="prevButton">{'<'}</button>
          <button className="nextButton">{'>'}</button>
          
          <div className="musicBoxFrame">
            <div className="frame" ref={frameRef}>
            {[...Array(8)].map((_, index) => (
              <Box key={index} />
            ))}
          </div>
        </div>
          
        </div>
        
      </Wrapper>
    </>
  );
};

export default MusicSelectPage;
import './MusicSelectPage.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/Wrapper'; 
import Box from '../../components/MusicBox';
const MusicSelectPage = () => {
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
    <Wrapper>
      <div className="musicSelectPage">
        <img
          className="musicSelectPageBackground"
          src={`${process.env.PUBLIC_URL}/img/musicSelectBackground.jpg`}
          style={{ height: `${verticalHeight}px` }}
          alt="Music Select Background"
        />
        <div className="mainPageLogo"
        style={{top:'10%'}}>Music Select</div> 
      </div>
      <Box>
      </Box> 
      
      </Wrapper>
    </>
    
  );
};

export default MusicSelectPage;
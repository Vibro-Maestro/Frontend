import './PlayPage.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/Wrapper';

const PlayPage = () => {
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
         <img
          className="musicSelectPageBackground"
          src={`${process.env.PUBLIC_URL}/img/musicSelectBackground.jpg`}
          style={{ height: `${verticalHeight}px` }}
          alt="Music Select Background"
        />
        <div className='MusicSheet'>악보</div>
        <div className='VibeImage'>분위기 사진</div>
        <div className="Piano">피아노 건반</div> 
      </Wrapper>
    </>
    
  );
};

export default PlayPage;
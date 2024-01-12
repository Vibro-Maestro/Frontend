import './PlayPage.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import Wrapper from '../../components/Wrapper';  
import Keyboard from '../../components/Keyboard'; 
import Oscillator from '../../components/Oscillator';
import ChangeWaveform from '../../components/ChangeWaveform';
import Gain from '../../components/Gain';
import Filter from '../../components/Filter' 


const PlayPage = () => {
  const MelodyContainerRef = useRef(null);
  const [verticalHeight, setVerticalHeight] = useState(0); 
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };
 
  const [effects, setEffects] = useState({
    waveform: "sine",
    gainValue: 0.15,
    filterType: "lowpass",
    filterFreq: 15000
  });

  const inputChange = e => {
    setEffects({ ...effects, [e.target.name]: e.target.value });  
  };
  var melodyArr = ['C', 'D', 'E','F','G','A','B']; 
  var melodyBeat = [2,4,4,4,2,4,16];  //몇분음표인지
  var interval = [10,10,10,10,10,10];  //음표 사이의 간격 
  var yCoordinate=[];  // y좌표-> melodyArr에 따라 설정됨.

  let imageArray = [];    
  const yCoordinateMap = {
    //도C ~ 시B
    C: 6.7,
    D: 5.9,
    E: 5.1,
    F: 4.7,
    G: 4.2,
    A: 3.7,
    B: 3.1,
  };

  useEffect(() => { 
    function decideMelody() {
      melodyArr.forEach((note, i) => {
        yCoordinate[i] = yCoordinateMap[note];
        let newImage = new Image();
        newImage.src = `${process.env.PUBLIC_URL}/img/note${melodyBeat[i]}.png`;
        imageArray.push(newImage);
      });
    } 
 
    function displayMelody() {
      let currentLeft = 10;
      imageArray.forEach((image, i) => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = `Note ${i}`;
        imgElement.style.position = 'absolute';
        imgElement.style.left = `${currentLeft}vmax`; // Set the current x-coordinate
        imgElement.style.top = `${yCoordinate[i]}vmax`; 
        imgElement.style.width = '4vmax'; 
        MelodyContainerRef.current.appendChild(imgElement); 
        currentLeft += interval[i]; 
      });
    }
 
    function measureAndDisplayHeight() {
      const newVerticalHeight = window.innerHeight;
      setVerticalHeight(newVerticalHeight);
    }

    measureAndDisplayHeight();
    decideMelody();
    displayMelody();
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
        
        <div className="comment">Try again!</div>

        <div className='MusicSheet'>
          <img 
            className="musicSheetWithoutMelody"
            src={`${process.env.PUBLIC_URL}/img/musicSheetWithoutMelody.png`}></img>
           <div ref={MelodyContainerRef} className='MelodyContainer'></div>
        </div>

        <div className='VibeImageBox'> 
           <img 
            className="VibeImage"
            src={`${process.env.PUBLIC_URL}/img/pinkFlower.jpg`}></img>
        </div>  

        <div className="PlayMenu">
        <div className="piano">
        <Oscillator
          waveform={effects.waveform}
          filterType={effects.filterType}
          filterFreq={effects.filterFreq}
          gainValue={effects.gainValue}
        />
      </div>
      <div className="effects">
        <ChangeWaveform inputChange={inputChange} waveform={effects.waveform} />
        <Gain inputChange={inputChange} gainValue={effects.gainValue} />
        <Filter
          inputChange={inputChange}
          filterType={effects.filterType}
          filterFreq={effects.filterFreq}
        />
      </div></div>
        <div className="Description">It feels like a fresh flower garden.</div>
      </Wrapper>
    </>
    
  );
};

export default PlayPage;
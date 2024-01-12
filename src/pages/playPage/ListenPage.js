import './PlayPage.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import Wrapper from '../../components/Wrapper';   
import Oscillator from '../../components/Oscillator';
import ChangeWaveform from '../../components/ChangeWaveform';
import Gain from '../../components/Gain';
import Filter from '../../components/Filter';  
const ListenPage = () => {

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
  
  var melodyArr = [48,50,52,53,55,57,59,60,62]; //멜로디 데이터
  var melodyBeat = [2,4,4,4,2,4,16,2,2];  //몇분음표인지
  var interval = [10,10,10,10,10,10,10,10];  //음표 사이의 간격 
  var yCoordinate=[];  // y좌표-> melodyArr에 따라 설정됨.

  let imageArray = [];    
  const yCoordinateMap = {
    //도C ~ 시B
    48:6.3,
    50:5.7,
    52:5.2,
    53:4.6,
    55:4.2,
    57:3.6,
    59:3.1,
    60:2.7,
    62:2.1,
  };

  const midiToNote = {
  48: 'C',
  50: 'D',
  52: 'E',
  53: 'F',
  55: 'G',
  57: 'A',
  59: 'B',
  60: 'C',   
  62: 'D',
};

  const [currentMelodyIndex, setCurrentMelodyIndex] = useState(0);
  const [matched, setMatched] = useState(false);
  const [enteredMidiNumbers, setEnteredMidiNumbers] = useState([]);
  const [currentMidiNumber, setCurrentMidiNumber] = useState(null);

  const checkMatchingMelody = (midiNumber) => { 
    setCurrentMidiNumber(midiNumber);
    setEnteredMidiNumbers([...enteredMidiNumbers, midiToNote[midiNumber]]);

    if (melodyArr[currentMelodyIndex] === midiNumber) {
      // Matched
      const imgElement = MelodyContainerRef.current.children[currentMelodyIndex];
      imgElement.style.border = '2px solid green';  // Highlight with a red border
      setCurrentMelodyIndex(currentMelodyIndex + 1);
      setMatched(true);
      console.log('Melody matched!');

      if (currentMelodyIndex === melodyArr.length - 1) {
        // Reached the end of the melodyArr 
      }
    } else {
      const imgElement = MelodyContainerRef.current.children[currentMelodyIndex];
      imgElement.style.border = '2px solid red';
      console.log('Melody not matched!');
      setMatched(false);
    }
  };

  useEffect(() => { 
    function decideMelody() {
      const loadImagePromises = melodyArr.map((note, i) => {
        yCoordinate[i] = yCoordinateMap[note];
        let newImage = new Image();
        newImage.src = `${process.env.PUBLIC_URL}/img/note${melodyBeat[i]}.png`;
    
        return new Promise((resolve, reject) => {
          newImage.onload = () => resolve(newImage);
          newImage.onerror = reject;
        });
      });
    
      Promise.all(loadImagePromises)
        .then(images => {
          imageArray = images.filter(image => image !== null);  //null값 안 들어가게 하기
          displayMelody();
        })
        .catch(error => {
          console.error("이미지 로딩 에러", error);
        });
    }
 
    function displayMelody() {
      let currentLeft = 10;
      imageArray.forEach((image, i) => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = `Note ${i}`;
        imgElement.style.position = 'absolute';
        imgElement.style.left = `${currentLeft}vmax`;  
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
        <div className="comment">
        {matched ? 'Melody matched!' : 'Melody not matched!'}
       </div>
       <div className="home-icon" onClick={() => handleClick('/')}><span className="material-icons">home</span></div>
       <div className="radio-icon"> <span className="material-icons">radio_button_checked</span></div>
       <div className="midiNumbers"> 
          <p>Current input: {midiToNote[currentMidiNumber]}</p>
          <p>Entered inputs: {enteredMidiNumbers.join(', ')}</p>
        </div>
    
        <div className='MusicSheet'>
          <img 
            className="musicSheetWithoutMelody"
            src={`${process.env.PUBLIC_URL}/img/musicSheetWithoutMelody.png`}></img>
           <div ref={MelodyContainerRef} className='MelodyContainer'></div>
        </div>

        <div className='VibeImageBox'> 
        <div className="Description">It feels like a fresh flower garden.</div>
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
             onMidiNumberChange={(midiNumber) => checkMatchingMelody(midiNumber)}
           />
        </div> 
        </div> 
        
      </Wrapper>
    </>
    
  );
};

export default ListenPage;
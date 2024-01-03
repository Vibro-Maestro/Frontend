import './App.css';
import Main from './pages/mainPage/Main'; 
import MusicSelectPage from './pages/musicSelectPage/MusicSelectPage';
import GalleryPage from './pages/galleryPage/GalleryPage';
import PlayPage from './pages/playPage/PlayPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { AnimatePresence } from 'framer-motion'; 

function App() {
  return (
    <AnimatePresence>
    <BrowserRouter>
      <Routes>  
        <Route exact path='/' element={<Main />} />
        <Route exact path='/MusicSelect' element={<MusicSelectPage />} />
        <Route exact path='/Play' element={<PlayPage />} />
        <Route exact path='/Gallery' element={<GalleryPage />} />
        <Route path="/*" element={<div>404 ERROR</div>} /> 
      </Routes>
    </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;

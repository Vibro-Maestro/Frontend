import './App.css';
import Main from './pages/mainPage/Main'; 
import MusicSelectPage from './pages/musicSelectPage/MusicSelectPage';
import GalleryPage from './pages/galleryPage/GalleryPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>  
        <Route exact path='/' element={<Main />} />
        <Route exact path='/MusicSelect' element={<MusicSelectPage />} />
        <Route exact path='/Gallery' element={<GalleryPage />} />
        <Route path="/*" element={<div>404 ERROR</div>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import Main from './pages/mainPage/Main'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>  
        <Route exact path='/' element={<Main />} />
        <Route path="/*" element={<div>404 ERROR</div>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

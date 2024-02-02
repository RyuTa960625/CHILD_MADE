import './App.css';
import Home from './component/Home';
import Header from './component/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App custom-cursor" >
      <BrowserRouter>      
        <Header/>
        <Routes>
          <Route path='/main' element={<Home/>}>
            </Route>
        </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default App;

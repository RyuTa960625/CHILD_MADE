import './App.css';
import Home from './component/Home';
import Header from './component/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookList from './component/BookList';

function App() {
  return (
    <div className="App custom-cursor" >
      <BrowserRouter>      
        <Header/>
        <Routes>
          <Route path='/main' element={<Home/>}>
            </Route>
          <Route path='/booklist' element={<BookList/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default App;

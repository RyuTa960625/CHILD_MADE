import './App.css';
import Home from './component/Home';
import Header from './component/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookList from './component/BookList';
import RecordList from './component/RecordList';

import Single from './component/Single'

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
          <Route path='/recordlist' element={<RecordList/>}>
          </Route>
          <Route path='/single' element={<Single />}></Route>
        </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default App;

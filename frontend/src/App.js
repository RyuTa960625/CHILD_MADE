import './App.css';
import Home from './component/Home';
import Header from './component/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookList from './component/BookList';
import RecordList from './component/RecordList';

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
        </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default App;

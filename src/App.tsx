import './App.scss';
import Price from './Components/Price/Price';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Reg from './Components/Reg/Reg';

function App() {
  
  const location = useLocation();

  const useLocations = (path: string = ''): boolean =>{
    return path === location.pathname
  }

  return (
    <div className="App">
      <Link to={'/price'} className={useLocations('/price') ? 'active' : ''}>Task PRICE</Link>
      <Link to={'/reg'} className={useLocations('/reg') ? 'active' : ''}>Task Registration</Link>
      <Routes>
        <Route path='/price' element={<Price/>}></Route>
        <Route path='/reg' element={<Reg/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

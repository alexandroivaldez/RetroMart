import { Routes, Route } from 'react-router-dom';
import Home from "./routes/home/home.component.jsx";
import { Outlet } from 'react-router-dom';

const Shop = () => {
  return (
    <h1>SHOP</h1>
  );
}

const App = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home />}>
        <Route path='shop' element={<Shop />}/>
      </Route>
    </Routes>
  );
}

export default App;

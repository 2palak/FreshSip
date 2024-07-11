/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Eatery from './screens/Eatery';
import MyOrder from './screens/MyOrder';
import { CartProvider } from './components/ContextReducer';
import './App.css';


function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/myorders" element={<MyOrder />} />
            <Route exact path="/eatery" element={<Eatery />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Eatery from './screens/Eatery';
import MyOrder from './screens/MyOrder';
import { CartProvider } from './components/ContextReducer';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/myorders" element={<MyOrder />} />
            <Route exact path="/eatery" element={<Eatery />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

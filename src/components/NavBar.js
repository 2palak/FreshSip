import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { useCart } from '../components/ContextReducer';
import React, { useState } from 'react';
import Modal from '../Modal';
import Cart from '../screens/Cart'; 
import './NavBar.css'

function NavBar() {
  let data = useCart();
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">FreshSip</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/eatery">Eatery</Link>
            </li>
            {localStorage.getItem("authToken") && (
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/myorders">My Orders</Link>
              </li>
            )}
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className='d-flex'>
              <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/signup">Sign Up</Link>
            </div>
          ) : (
            <div className='d-flex'>
              <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
                Cart 🛒
                <Badge pill bg="danger"> {data.length} </Badge>
              </div>
              { cartView? <Modal onClose={()=>setCartView(false)}> <Cart/> </Modal>:null}
              <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div> 
      </div>
    </nav>
  );
}

export default NavBar;

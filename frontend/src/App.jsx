import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateUser from './pages/CreateUser';
import UserList from './pages/UserList';
import CreateProduct from './pages/CreateProduct';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        {/* Üst Menü */}
        <nav className="navbar bg-base-100 shadow-lg rounded-lg mb-8">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost normal-case text-xl text-primary">Ana Sayfa</Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal p-0 space-x-4">
              <li>
                <Link to="/create-user" className="btn bg-secondary text-white">Kullanıcı Oluştur</Link>
              </li>
              <li>
                <Link to="/user-list" className="btn bg-accent text-white">Kullanıcı Listesi</Link>
              </li>
              <li>
                <Link to="/create-product" className="btn bg-neutral text-white">Ürün Oluştur</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Rotalar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

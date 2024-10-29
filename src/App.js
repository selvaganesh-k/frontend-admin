import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminNavbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AddProduct from './components/products/Addproducts';
import ProductList from './components/products/ProductList';
import EditProduct from './components/products/Editproducts';
import UserList from './components/Userlist';
import CartList from './components/Cartlist';
import BookingList from './components/Bookins';
import './assets/style.css';

const App = () => (
  <Router>
    <div className="container-fluid p-0">
      <AdminNavbar />
      <div className="d-flex">
        <Sidebar />
        <main className="content-area flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/cart" element={<CartList />} />
            <Route path="/bookings" element={<BookingList />} />
            <Route path="/edit-product/:productid" element={<EditProduct />} />
          </Routes>
        </main>
      </div>
    </div>
  </Router>
);

export default App;

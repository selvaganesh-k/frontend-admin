import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import apiClient from '../apiService/Apiservice';

const CartList = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      const response = await apiClient.get('/getAllCarts');
      const fetchedCarts = response.data.carts;
      setCarts(fetchedCarts);
      await handleAddProductDetails(fetchedCarts);
    } catch (error) {
      console.error('Error fetching carts:', error);
    }
  };

  const handleAddProductDetails = async (fetchedCarts) => {
    const updatedCarts = await Promise.all(
      fetchedCarts.map(async (cart) => {
        try {
          const productResponse = await apiClient.get(`/products/${cart.productid}`);
          const product = productResponse.data;
          const imageArray = product.imagePaths
            ? product.imagePaths.split(',').map(img => `http://localhost:5000/${img}`.trim())
            : [];

          return {
            ...cart,
            productName: product.productName,
            productImage: imageArray[0],
            productPrice: product.reducePrice,
          };
        } catch (error) {
          console.error(`Error fetching product details for product ID: ${cart.productid}`, error);
          return cart;
        }
      })
    );

    setCarts(updatedCarts);
  };
  const deleteCart = async (id) => {
    try {
      const response = await apiClient.delete(`/carts/${id}`);
      console.log(response.data);
      fetchCarts(); 
    } catch (error) {
      console.error('Error deleting product:', error);
      
    }
    setTimeout(() => 3000);
  };

  return (
    <div>
      <h2>Cart Items</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Product</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {carts.map((cart, index) => (
            <tr key={cart.id}>
              <td>{index + 1}</td>
              <td>{cart.email}</td>
              <td>{cart.productName}</td>
              <td>
                <img
                  src={cart.productImage}
                  alt={cart.productName}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </td>
              <td>&#8377; {cart.productPrice}</td>
              <td>{cart.quantity}</td>
              <td>&#8377; {cart.total}</td>
              <td>
                <Button variant="danger" size="sm" className="ml-2" onClick={()=>deleteCart(cart.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CartList;

import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import apiClient from '../apiService/Apiservice';

const Bookins = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get('/getAllOrders');
      const fetchedOrders = response.data.orders;
  
      const updatedOrders = fetchedOrders.map((order) => {
       
        const ordered = order.orderdProducts || '';
        const productPairs = ordered.split(',');
  
        const products = productPairs.map(pair => {
          const [productId, quantity] = pair.split(':');
          return {
            productId: Number(productId),
            quantity: Number(quantity)    
          };
        });
        console.log(products);
        return { ...order, products };
      });
  
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <div>
      <h2>Orders</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Address</th>
            <th>Products</th>
            <th>Total Quantity</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.name}</td>
              <td>{`${order.address}, ${order.city}, ${order.state}, ${order.pincode}`}</td>
              <td>
                {order.products.map(product => (
                  <div key={product.productId}>
                    Product ID: {product.productId}, Quantity: {product.quantity} kg
                  </div>
                ))}
              </td>
              <td>{order.products.reduce((sum, product) => sum + product.quantity, 0)}</td>
              <td>&#8377; {order.totalamount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Bookins;

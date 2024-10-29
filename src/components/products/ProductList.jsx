import React, { useEffect, useState } from 'react';
import apiClient from '../../apiService/Apiservice';
import AddProduct from './Addproducts';
import EditProduct from './Editproducts';
import { Table, Button, Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ProductList.css';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setshowModal] = useState(false);

  const handleShow=()=>setshowModal(true);
  const handleClose=()=>setshowModal(false);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await apiClient.get('/getAll');
      setProducts(response.data.products); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const deleteProduct = async (id) => {
    try {
      const response = await apiClient.delete(`/deleteProduct/${id}`);
      setMessage(response.data.message);
      fetchProducts(); 
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage('Failed to delete product');
    }
    setTimeout(() => setMessage(''), 3000);
  };
  return (
    <div>
      <div className='d-flex justify-content-between w-100 mb-2'><h2>Product List</h2>
      <Button variant="primary" size='sm' onClick={handleShow} >Add New Product</Button>{' '}
      </div>
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProduct onClose={handleClose} />
        </Modal.Body>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Full Price</th>
            <th>Reduced Price</th>
            <th>Available Kg</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => {
                const image = product.imagePaths.split(',')[0]
                return(
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td><img src={'http://localhost:5000/'+image} alt={product.productName} className='product-img' /></td>
                <td>{product.productName}</td>
                <td>&#8377; {product.fullPrice.toFixed(2)}</td>
                <td>&#8377; {product.reducePrice.toFixed(2)}</td>
                <td>{product.availableKilograms} kg</td>
                <td>
                  <button className="btn btn-warning btn-sm"><Link to={`/edit-product/${product.id}`} 
                      style={{ textDecoration: 'none', color: 'inherit' }} >Edit</Link></button>
                  <button className="btn btn-danger btn-sm ml-2" onClick={()=>deleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
                )
})
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;

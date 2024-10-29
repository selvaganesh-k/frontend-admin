import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import apiClient from '../../apiService/Apiservice';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    productName: '',
    fullPrice: '',
    reducePrice: '',
    productDes: '',
    availableKilograms: '',
    forSale: false,
    deliveryCharge: 'free delivery',
  });

  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]); 
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

 
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const filePaths = files.map((file) => URL.createObjectURL(file));
    setImages(filePaths);
    setImageFiles(files);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    imageFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await apiClient.post('/addProducts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setSuccess(true);
      console.log(response.data.message);

      setTimeout(() => setSuccess(false), 3000);
      setProductData({
        productName: '',
        fullPrice: '',
        reducePrice: '',
        productDes: '',
        availableKilograms: '',
        forSale: false,
        deliveryCharge: 'free delivery',
      });

      setImages([]);
      setImageFiles([]);
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data.message);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className="main-content m-0">
      <h2>Add New Product</h2>
      {success && <Alert variant="success">Product added successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={productData.productName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="fullPrice">
              <Form.Label>Full Price</Form.Label>
              <Form.Control
                type="number"
                name="fullPrice"
                value={productData.fullPrice}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="reducePrice">
              <Form.Label>Reduced Price</Form.Label>
              <Form.Control
                type="number"
                name="reducePrice"
                value={productData.reducePrice}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="availableKilograms">
              <Form.Label>Available Kilograms</Form.Label>
              <Form.Control
                type="number"
                name="availableKilograms"
                value={productData.availableKilograms}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="forSale">
              <Form.Check
                type="checkbox"
                name="forSale"
                label="Available for Sale"
                checked={productData.forSale}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imagePaths">
              <Form.Label>Upload Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="deliveryCharge">
              <Form.Label>Delivery Charge</Form.Label>
              <Form.Control
                type="text"
                name="deliveryCharge"
                value={productData.deliveryCharge}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="productDes">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            name="productDes"
            rows={3}
            value={productData.productDes}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>

      {images.length > 0 && (
        <div className="mt-4">
          <h5>Preview Images:</h5>
          <Row>
            {images.map((src, index) => (
              <Col key={index} md={3} className="mb-3">
                <img
                  src={src}
                  alt={`Product ${index + 1}`}
                  className="img-fluid"
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default AddProduct;

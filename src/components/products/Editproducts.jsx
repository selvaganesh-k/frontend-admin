import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import apiClient from '../../apiService/Apiservice';

const EditProduct = () => {
  const { productid } = useParams();
  console.log(productid)
  const [productData, setProductData] = useState({
    productName: '',
    fullPrice: '',
    reducePrice: '',
    productDes: '',
    availableKilograms: '',
    forSale: false,
    deliveryCharge: 'free delivery',
  });

  const [existingImage, setExistingImage] = useState([]);
  const [newImage, setNewImage] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${productid}`);
        const product = response.data;
         setProductData({
          productName: product.productName,
          fullPrice: product.fullPrice,
          reducePrice: product.reducePrice,
          productDes: product.productDes,
          availableKilograms: product.availableKilograms,
          forSale: product.forSale,
          deliveryCharge: product.deliveryCharge,
        });
        const imagesArray = product.imagePaths ? product.imagePaths.split(',').map(path => `http://localhost:5000/${path}`) : [];
        setExistingImage(imagesArray);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productid]);

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
    setNewImage(filePaths);
    setImageFiles(files);
  }
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
    const response = await apiClient.put(`/updateProduct/${productid}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setSuccess(true);
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

      setNewImage([]);
      setImageFiles([]);
      setExistingImage([]);
    console.log(response.data.updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error.response?.data || error.message);
  }
};

  return (
    <div className="main-content m-0">
      <h2>Edit Product</h2>
      {success && <Alert variant="success">Product updated successfully!</Alert>}
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
              <Form.Label>Upload New Images</Form.Label>
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
          Update Product
        </Button>
      </Form>

      {existingImage.length > 0 && (
        <div className="mt-4">
          <h5>Existing Images:</h5>
          <Row>
            {existingImage.map((src, index) => (
              <Col key={index} md={3} className="mb-3">
                <img
                  src={src}
                  alt={`Existing Product ${index + 1}`}
                  className="img-fluid"
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
      {newImage.length > 0 && (
        <div className="mt-4">
          <h5>Preview New Images:</h5>
          <Row>
            {newImage.map((src, index) => (
              <Col key={index} md={3} className="mb-3">
                <img
                  src={src}
                  alt={`New Product Preview ${index + 1}`}
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

export default EditProduct;

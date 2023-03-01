import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError(true);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <h2>Product does not exist</h2>;
  }

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <Container style={{ marginTop: '30px' }}>
      <Row>
        <Col md={4}>
          <Card.Img
            variant="top"
            src={require(`../assets/images/${product.img}`)}
            alt="Product Img"
            height="300"
          />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={12}>
              <h1>{product.name}</h1>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h5>Description</h5>
            </Col>
            <Col>
              <p style={{ marginLeft: '50px' }}>{product.description}</p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h5>Price</h5>
            </Col>
            <Col>
              <p style={{ marginLeft: '50px' }}>{product.price} DT</p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h5>Likes</h5>
            </Col>
            <Col>
              <p style={{ marginLeft: '50px' }}>{product.like}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;

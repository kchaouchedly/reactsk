
import { useState, useEffect } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import Product from "./Product";
import axios from "axios";
import { getallProducts } from "../service/api";

function Products(props) {
  const [Greeting, setGreeting] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [products, setProducts] = useState([]);

  const buy = (product) => {
    product.quantity--;
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  useEffect(() => {
    console.log("I have finished rendering avec un état = " + Greeting);
    setGreeting(true);
    setTimeout(() => {
      setGreeting(false);
    }, 3000);
    return () => {
      console.log("I'm being destroyed");
    };
  }, []);

  useEffect(() => {
    console.log("I have been updated avec un état = " + Greeting);
  }, [Greeting]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getallProducts();
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container style={{ marginTop: "30px" }}>
      {Greeting && (
        <Alert variant="success">
          <Alert.Heading>
            Hey, Welcome To Our Shop <strong> MyStore </strong>{" "}
          </Alert.Heading>
          <p>Thank you for choosing our store, we hope you enjoy your shopping experience!</p>
          <hr />
        </Alert>
      )}
      <Row>
        {products?.map((product, index) => (
          <Col md={4} key={index}>
            <Product product={product} buyFunction={buy} />
          </Col>
        ))}
      </Row>
      {showMessage && (
        <Alert style={{ marginTop: "30px" }} variant="primary">
          <p>You Bought an Item</p>
        </Alert>
      )}
    </Container>
  );
}

export default Products;

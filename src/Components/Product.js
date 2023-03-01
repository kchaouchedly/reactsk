import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteProduct } from "../service/api";



function Product (props) {
  const handleDelete = async (id) => {
    await deleteProduct(id);
   
  };
  const [product,setProduct] = useState(props.product)

  const addLikes = (e) => {
    e.preventDefault();
    setProduct({...product,like:product.like+1})
  };
  const className = product.like>5 ? "text-center bestProduct" : "text-center"
    return (
      <Card style={{ width: "18rem" }} className={className}  border="secondary">
      
             <Card.Header>
        <Card.Img
          variant="top"
          src={require("../assets/images/" + product.img)}
          alt="Product Img"
          height={200}
        />
        </Card.Header>
        <Card.Body>
          <Card.Title><Link to={`/products/${product.id}`}>{product.name}</Link></Card.Title>
          <Card.Text>Price : {product.price} DT</Card.Text>
          <Card.Text>Quantity :{product.quantity}</Card.Text>
          <Card.Text>Likes :{product.like}</Card.Text>
          <Row>
            <Col md={6}>
              {" "}
              <Button variant="primary" onClick={addLikes}>Like</Button>
            </Col>
            <Link to={`/update-product/${product.id}`}>
  <Button  variant="warning">
    Update Product
  </Button>
</Link>

<Button variant="danger" onClick={() => handleDelete(product.id)}>
          Delete Product
        </Button>
        
            <Col md={6}>
              <Button variant="info" onClick={()=>props.buyFunction(product)} disabled={product.quantity===0}>Buy</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );

}

export default Product;

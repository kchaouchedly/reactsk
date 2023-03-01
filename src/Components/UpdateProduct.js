import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getProductById, editProduct } from "../service/api";

function UpdateProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [like, setLike] = useState(0);
  const [img, setImg] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const productData = await getProductById(id);
      setProduct(productData);
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setLike(productData.like);
      setImg(productData.img)
    }
    fetchProduct();
  }, [id]);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProduct((prevState) => ({
        ...prevState,
        img: `${file.name}`,
      }));
    };
  };

  
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedProduct = {
      name,
      description,
      price,
      like,
    };
    if (img) {
      updatedProduct.img = img;
    }
    await editProduct(id, updatedProduct);
    window.location.href = `/products`;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Description:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Price:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Likes:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter like"
          value={like}
          onChange={(event) => setLike(event.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Image:</Form.Label>
        <Form.Control type="file" onChange={handleImageUpload} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default UpdateProduct;

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addProduct } from "../service/api";
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        img: "",
        like: 0,
        quantity: 0,
        description: "",
     });  
   
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

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
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addProduct(product);
        navigate('/products');
    };

    return (
        <div className="mt-3">
            <h1>Add Product</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="productName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" name="name"  onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="productDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description"  onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="productPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" name="price" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="productImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="img" onChange={handleImageUpload} />
                  
                </Form.Group>
                <Form.Group controlId="productQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" name="quantity" value={product.quantity} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default AddProduct;

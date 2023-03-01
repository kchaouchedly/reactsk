import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddProduct from './Components/AddProduct';
import UpdateProduct from './Components/UpdateProduct';
const Products = React.lazy(()=> import('./Components/Products'))
const NotFound = React.lazy(()=> import('./Components/NotFound'))
const NavbarComponent = React.lazy(()=> import('./Components/Navbar'))
const ProductDetails = React.lazy(()=> import('./Components/ProductDetails'))

function App() {
  return (
    <>
    <Suspense fallback={<p>Loading ...</p>}>
    <NavbarComponent/>
    <Routes>
    <Route path='/products'>
      <Route index element={<Products />}/>
      <Route path=':id' element={<ProductDetails />}/>
    </Route>
    <Route path='/add-product' element={<AddProduct />}/>
    <Route path="/update-product/:id" element={<UpdateProduct />} />


      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </Suspense>
   </>
  );
}

export default App;

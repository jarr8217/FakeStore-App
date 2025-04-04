import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ProductDetails from './components/ProductDetails'
import ProductList from './components/ProductList'
import NavBar from './components/NavBar'
import AddProduct from './components/AddProduct'




function App() {
  

  return (
    <>
    <NavBar />
    <Routes>
      <Route path='/' element={ <Home /> }></Route>
      <Route path='/products' element={ <ProductList /> }></Route>
      <Route path='/products/:id' element={ <ProductDetails /> }></Route>
      <Route path='/AddProduct' element={ <AddProduct /> }></Route>
    </Routes>
    </>
  )
}

export default App

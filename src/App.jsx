import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import ProductDetails from './components/ProductDetails'
import ProductList from './components/ProductList'
import NavBar from './components/NavBar'
import AddProduct from './components/AddProduct'
import About from './components/About'
import EditProduct from './components/EditProduct'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/about' element={<About />} />
        <Route path='/editproduct/:id' element={<EditProduct />} />
        <Route path='/editproduct' element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App

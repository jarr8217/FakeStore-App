import './App.css'
import { Routes, Route } from 'react-router-dom'
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
      <Route path='/' element={ <Home /> } onEnter={() => console.log('Navigated to Home')} />
      <Route path='/products' element={ <ProductList /> } onEnter={() => console.log('Navigated to Product List')} />
      <Route path='/products/:id' element={ <ProductDetails /> } onEnter={() => console.log('Navigated to Product Details')} />
      <Route path='/AddProduct' element={ <AddProduct /> } onEnter={() => console.log('Navigated to Add Product')} />
      <Route path='/about' element={ <About /> } onEnter={() => console.log('Navigated to About')} />
      <Route path='EditProduct' element={ <EditProduct /> } onEnter={() => console.log('Navigated to Edit Product')} />
      <Route path='/edit-product/:id' element={ <EditProduct /> } onEnter={() => console.log('Navigated to Edit Product')} />
    </Routes>
    </>
  )
}

export default App
 
import { Link } from 'react-router-dom';
import FeaturedProducts from './FeaturedProducts.jsx'; 
import React, { useEffect } from "react";
import bannerImage from '../assets/image-14.webp'; // Import the image

const Home = () => {
    useEffect(() => {
        console.log('Home component rendered');
    }, []);

    return (
        <>
        <div className="container mt-5">
            <div className="text-center">
                <h1 className="display-4 text-danger">Welcome to FakeStore</h1>
                <p className="lead text-light">Your one-stop shop for fake products with real style.</p>
                <img
                src={bannerImage} // Use the imported image
                alt="FakeStore Banner"
                className="img-fluid rounded shadow-sm my-4 border border-danger"
                />
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to="/products" className="btn btn-danger btn-lg">
          Shop Now
        </Link>
        <Link to="/about" className="btn btn-outline-danger btn-lg">
          Learn More
        </Link>
      </div>
    </div>

    <section className="mt-5">
      <h2 className="mb-4 text-danger">Featured Products</h2>
      <FeaturedProducts />
    </section>
  </div>

        </>
    )
}

export default Home;
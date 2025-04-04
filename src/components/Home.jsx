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
                <h1 className="display-4">Welcome to FakeStore</h1>
                <p className="lead">Your one-stop shop for fake products with real style.</p>
                <img
                src={bannerImage} // Use the imported image
                alt="FakeStore Banner"
                className="img-fluid rounded shadow-sm my-4 banner-image"
                />
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to="/products" className="btn btn-primary btn-lg" onClick={() => console.log('Shop Now button clicked')}>
          Shop Now
        </Link>
        <Link to="/about" className="btn btn-outline-secondary btn-lg" onClick={() => console.log('Learn More button clicked')}>
          Learn More
        </Link>
      </div>
    </div>

    <section className="mt-5">
      <h2 className="mb-4">Featured Products</h2>
      {/* Render a FeaturedProducts component here */}
      <FeaturedProducts />
    </section>
  </div>

        </>
    )
}

export default Home;
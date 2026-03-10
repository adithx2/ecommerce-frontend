import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";
import { Link } from "react-router-dom";


const Home = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      const res = await getProducts();
      setProducts(res.products);
      console.log(res)

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div>

      <div className="bg-gray-100 py-20 text-center">

        <h1 className="text-5xl font-bold mb-4">
          Discover Your Style
        </h1>

        <p className="text-gray-600 mb-6">
          Explore the latest fashion collections and trending products
        </p>

        <Link to='/signup'>

        <button className="bg-blue-500 text-white px-4 rounded py-2">
          Shop Now
        </button>

        </Link>

      </div>


      <div className="max-w-7xl mx-auto p-6">

        <h1 className="text-3xl font-bold py-4 mb-6">
          Featured Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {products?.slice(0, 4).map((product) => (

            <div
              key={product._id}
              className="bg-white shadow rounded-lg p-4 text-center"
            >

              <img
                src={product.image}
                alt={product.name}
                className="h-48 object-cover mb-3 rounded"
              />

              <h3 className="text-lg font-semibold">
                {product.name}
              </h3>

              <p className="text-gray-600">
                ₹{product.price}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
};





export default Home;
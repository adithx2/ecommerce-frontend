import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className=" border rounded shadow p-3">
      <img
        src={product.image}
        alt={product.name}
        className=" object-cover"
      />

      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>

      <p className="text-gray-500">{product.category}</p>

      <p className="text-blue-600 font-bold">₹{product.price}</p>

      <Link
        to={`/products/${product._id}`}
        className="block mt-2 bg-blue-500 text-white text-center py-1 rounded"
      >

        <button> View Details</button>
      </Link>
    </div>
  );
};

export default ProductCard;
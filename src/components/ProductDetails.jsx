import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getProductById } from "../services/productApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await getProductById(id);
      console.log(res)
      setProduct(res)
      
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();

  const handleAddCart = () => {
    dispatch(addToCart(product));

  };

  if (!product) return <p>Loading...</p>;

  console.log(product)

  return (
    <div className="max-w-4xl mx-auto p-4">
      <img
        src={product?.image}
        alt={product?.name}
        className="w-70 object-cover"
      />

      <h1 className="text-2xl font-bold mt-4">{product?.name}</h1>

      <p className="text-gray-600 mt-2">{product?.description}</p>

      <p className="text-xl text-blue-600 font-bold mt-2">
        ₹{product?.price}
      </p>

      <button
        onClick={handleAddCart}
        className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded mt-3"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";
import ProductCard from "../pages/productCard";
import { useSearchParams } from "react-router-dom";

const Products = () => {

  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort, minPrice, maxPrice]);

  const fetchProducts = async () => {
    try {
      const res = await getProducts({
        search : search,
         category : category,
         sort : sort ,
         minPrice : minPrice,
         maxPrice : maxPrice

        });

      setProducts(res.products);

      console.log(res.products)

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <>

      <div className="max-w-7xl mx-auto p-4">


        <div className="flex gap-4 mb-6">

          <select
            className="border p-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >

            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
              <option value="Cosmetics">Cosmetics</option>
            <option value="Fashion">Fashion</option>
           

          </select>


          <select
            className="border p-2 rounded"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >

            <option value="">Sort</option>
            <option value="price">Price Low → High</option>
            <option value="-price">Price High → Low</option>

          </select>


          <input
            type="number"
            placeholder="Min Price"
            className="border p-2 rounded"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />


          <input
            type="number"
            placeholder="Max Price"
            className="border p-2 rounded"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

        </div>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

          {products?.map((product) => (

            <ProductCard key={product._id} product={product} />

          ))}

        </div>

      </div>
    </>
  );

};



export default Products;


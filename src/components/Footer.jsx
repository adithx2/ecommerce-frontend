import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-200 w-full  p-4 text-black">

      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-5">


        <div>
          <h2 className="text-2xl font-bold text-black mb-2">
            Shopify
          </h2>

          <p className="text-sm">
            Discover the latest fashion trends and premium clothing
            collections for men and women.
          </p>
        </div>


        <div>
          <h3 className="text-lg font-semibold text-black mb-2">
            Quick Links
          </h3>

          <ul className="space-y-2">

            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>Login</li>

          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-black mb-4">
            Customer Service
          </h3>

          <ul className="space-y-2">

            <li>
              Contact Us
            </li>

            <li>
              Order Tracking
            </li>

            <li>
              Returns
            </li>

            <li>
              FAQ
            </li>

          </ul>
        </div>


        <div>
          <h3 className="text-lg font-semibold text-black mb-4">
            Subscribe
          </h3>

          <p className="text-sm mb-4">
            Get updates about new products and offers
          </p>

          <div className="flex">

            <input
              type="email"
              placeholder="Email"
              className="px-5 w-full "
            />

            <Link to='/login'>
              <button className="bg-gray-200 text-black px-2 mx-4 ">
                Join
              </button>

            </Link>

          </div>

        </div>

      </div>


      <div className="text-center p-2 text-sm">

        © 2026 Shopify. All Rights Reserved.

      </div>

    </footer>
  );
};

export default Footer;
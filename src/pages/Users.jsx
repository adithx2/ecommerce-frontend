import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getUsersBYId } from "../services/usersApi";


const Users = () => {

  const { id } = useParams()

  console.log(id)

  const user = useSelector((state) => state.auth.user);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {

    fetchProfile();

  }, [id]);

  const fetchProfile = async () => {

    try {
      const res = await getUsersBYId(id);

      setProfile(res.user);
      setLoading(false)

    } catch (error) {

      console.log(error);
      setLoading(false)

    }

  };

  if (loading) return <p>Loading profile...</p>;


  return (
    <div className="max-w-4xl  mx-auto p-5">

      <div className="text-blue-800">
        <h1 className="text-3xl font-bold mb-5 text-center p-4 ">Hello {user.name}</h1>
      </div>
      <div className="bg-white shadow rounded-lg p-5 mb-6">

        <div className="grid grid-cols-1  gap-4">
          <p><strong>Username:</strong> {profile?.name}</p>
          <p><strong>Email:</strong> {profile?.email}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-5">
        <h3 className="text-xl font-semibold mb-2">Cart Summary</h3>
        {cartItems.length === 0 ? (
          <p className="text-green-700">Your cart is empty.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Product</th>
                <th className="py-2">Price</th>
                <th className="py-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">₹{item.price}</td>
                  <td className="py-2">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {cartItems.length > 0 && (
          <Link
            to="/cart"
            className="inline-block mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          >

            <button>
              Go to Cart
            </button>
          </Link>
        )}
      </div>
    </div>

  );
};

export default Users;
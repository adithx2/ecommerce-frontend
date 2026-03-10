import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../redux/features/cartSlice";

const Cart = () => {

  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleRemove = (id) => {

    dispatch(removeFromCart(id))
  }

  return (

    <div className="p-5 h-screen">

      {cartItems.length === 0 ? (

  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">

    <img
      src="https://cdn-icons-png.flaticon.com/512/11010/11010851.png"
      alt="empty cart"
      className="w-40 mb-6 opacity-80"
    />

    <h2 className="text-3xl font-semibold mb-3">
      Your Cart is Empty
    </h2>

    <p className="text-gray-500 mb-6">
      Looks like you haven’t added anything to your cart yet.
    </p>

    <Link
      to="/products"
      className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
    >
      <button>
      Continue Shopping
      </button>
    </Link>

  </div>

) : (

  cartItems.map((item) => (

    <div key={item._id} className="border p-3 gap-4 mb-3">

      <img
        src={item.image}
        className="w-20 h-20 object-cover"
      />

        <div>
          <img src={item.img} />
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
          <p>Qty: {item.quantity}</p>
        </div>

        <button onClick={() => handleRemove(item._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">Remove</button>
      </div>

      ))

      )}

    </div>
  )
}



export default Cart
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../services/usersApi";
import { getProducts, deleteProduct, createProduct } from "../services/productApi";

const Admin = () => {

    const user = useSelector((state) => state.auth.user);

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    const [usersLoading, setUsersLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(true);

    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
    });

    //   users

    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const res = await getUsers();
                setUsers(res);
                setUsersLoading(false);

            } catch (error) {

                console.log(error);
                setUsersLoading(false);

            }
        };

        fetchUsers();

    }, []);

    //   products

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const res = await getProducts();
                console.log(res)
                setProducts(res.products)
                setProductsLoading(false);

            } catch (error) {

                console.log(error);
                setProductsLoading(false);

            }

        };

        fetchProducts();

    }, []);

    //   delete

    const handleDeleteProduct = async (id) => {

        try {

            await deleteProduct(id);
            setProducts(products.filter((p) => p._id !== id));

        } catch (error) {

            console.log(error);

        }

    };

    //   create product

    const handleAddProduct = async (e) => {

        e.preventDefault();

        try {

            const res = await createProduct(newProduct);

            setProducts([...products, res]);

            // Reset form

            setNewProduct({
                name: "",
                description: "",
                price: "",
                category: "",
                image: "",
                stock: "",
            });

        } catch (error) {

            console.log(error);

        }

    };


    if (usersLoading || productsLoading) return <p>Loading...</p>;

    if (!user || user.role !== "admin") {
        return (
            <div className="min-h-screen fle flex-col items-center justify-center bg-gray-100 text-center p-6">

                <h1 className="text-7xl font-bold text-red-500 mb-2">
                    404
                </h1>

                <h2 className="text-2xl font-semibold mb-4">
                    Access Denied
                </h2>

                <p className="text-green-500 mb-6">
                    You don't have permission to access this page.
                </p>

                <Link
                    to="/"
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >

                    <button>
                        Go Back Home
                    </button>
                </Link>

            </div>
        );
    }
    return (

        <div className="max-w-5xl mx-auto p-5">

            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {/* Users List */}

            <h2 className="text-xl font-semibold mb-4">All Users</h2>

            <table className="w-full text-left border-collapse mb-10">

                <thead>
                    <tr className="border-b">
                        <th className="py-2">Name</th>
                        <th className="py-2">Email</th>
                        <th className="py-2">Role</th>
                    </tr>
                </thead>

                <tbody>

                    {users.map((u) => (

                        <tr key={u._id} className="border-b">

                            <td className="py-2">{u.name}</td>
                            <td className="py-2">{u.email}</td>
                            <td className="py-2">{u.role}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

            {/* Products */}

            <h2 className="text-xl font-semibold mb-4">Add Product</h2>

            <form
                onSubmit={handleAddProduct}
                className="mb-10 p-4 border rounded bg-gray-50"
            >

                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className="border p-2 w-full mb-2 rounded"
                    required
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, description: e.target.value })
                    }
                    className="border p-2 w-full mb-2 rounded"
                    required
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    className="border p-2 w-full mb-2 rounded"
                    required
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={newProduct.category}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="border p-2 w-full mb-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, image: e.target.value })
                    }
                    className="border p-2 w-full mb-2 rounded"
                />

                <input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, stock: e.target.value })
                    }
                    className="border p-2 w-full mb-4 rounded"
                />

                <button
                    type="submit"
                    className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                >
                    Add Product
                </button>

            </form>

            {/* Product Table */}

            <h2 className="text-xl font-semibold mb-4">All Products</h2>

            <table className="w-full text-left border-collapse">

                <thead>
                    <tr className="border-b">
                        <th className="py-2 px-2">Name</th>
                        <th className="py-2 px-2">Price</th>
                        <th className="py-2 px-2">Category</th>
                        <th className="py-2 px-2">Stock</th>
                        <th className="py-2 px-2">Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {products.map((p) => (

                        <tr key={p._id} className="border-b">

                            <td className="py-2 px-2">{p.name}</td>
                            <td className="py-2 px-2">₹{p.price}</td>
                            <td className="py-2 px-2">{p.category}</td>
                            <td className="py-2 px-2">{p.stock}</td>

                            <td className="py-2 px-2">

                                <button
                                    onClick={() => handleDeleteProduct(p._id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default Admin;
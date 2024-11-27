import React, { useEffect, useState } from "react";
import axios from "axios";
import avatar from "../assets/avatar.jpg";
import { formatDistanceToNow } from "date-fns";

interface User {
  username: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  userId?: User;
  timestamp: Date;
}

const Card = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <div>
      {products.map((product) => (
        <div key={product._id} className="flex flex-col my-2 p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <div className="flex items-center gap-2">
            <img
              className="w-12 h-12 rounded-3xl"
              src={avatar}
              alt="character.png"
            />
            <div className="flex flex-col">
              <p className="text-gray-500 font-bold dark:text-gray-400">
                {product.userId?.username || "Unknown"}
              </p>
              <p className="text-gray-400 text-sm dark:text-gray-500">
                {formatDistanceToNow(new Date(product.timestamp), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <h2 className="my-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {product.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Card;

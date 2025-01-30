
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import { useAuth0 } from '@auth0/auth0-react';
import Modal from './Modal'; // Import the modal component

interface ProductDetail {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  category: string;
}

function ProductDetail() {
  const [data, setData] = useState<ProductDetail>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const userId = user?.sub ?? '';
  const navigate = useNavigate(); // Use navigate to programmatically change routes

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
      setData(response.data);
    });
  }, [id]);

  const handleAddToCart = () => {
    if (data) {
      dispatch(addToCart({ user: userId, product: { ...data, quantity: 1 } }));
      setIsModalOpen(true); // Open the modal when an item is added
    }
  };

  const handleBuyNow = () => {
    if (data) {
      // Add the product to cart and redirect to checkout
      dispatch(addToCart({ user: userId, product: { ...data, quantity: 1 } }));
      navigate('/checkout'); // Redirect to checkout page
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container flex justify-center mx-auto p-14 sm:p-6 md:p-8 lg:p-12">
      <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden w-[50%]">
        <div className="w-full md:w-1/2 p-4">
          <img 
            src={data?.image} 
            alt={data?.title} 
            className="w-full h-auto object-cover rounded-md" 
          />
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">${data?.price}</h1>
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mt-2">{data?.title}</h2>
            <p className="text-sm md:text-base text-gray-600 mt-2">{data?.description}</p>
            <div className="flex items-center mt-4">
              <span className="text-gray-500 text-sm mr-2">Category:</span>
              <span className="text-gray-600">{data?.category}</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-gray-500 text-sm mr-2">Rating:</span>
              <span className="text-yellow-500">{data?.rating.rate} ★</span>
              <span className="text-gray-500 text-sm ml-1">({data?.rating.count} reviews)</span>
            </div>
          </div>
          <div className="flex mt-4 space-x-4">
            <button 
              onClick={handleAddToCart}
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default ProductDetail;

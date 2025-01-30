// Checkout.tsx
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { generatePDF } from './generateInvoice';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const userId = user?.sub ?? '';
  const invoiceRef = useRef<HTMLDivElement>(null);

  const userCart = useSelector((state: RootState) =>
    state.cart.cartList.find(cart => cart.user === userId)?.cart ?? []
  );

  const totalPrice = userCart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    // Implement order placement logic here
    navigate('/order-success'); // Redirect to a success page after placing the order
  };

  const handleGenerateInvoice = () => {
    if (invoiceRef.current) {
      generatePDF(invoiceRef.current);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Checkout</h1>

      <div ref={invoiceRef} className="space-y-6">
        {/* Cart Items */}
        <div className="space-y-4">
          {userCart.length === 0 ? (
            <div className="text-center py-8 text-lg font-semibold text-gray-700">
              Your cart is empty!
            </div>
          ) : (
            <div className="space-y-4">
              {userCart.map((item) => (
                <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
                  <div className="flex p-4">
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-md font-medium text-gray-600">{item.category}</p>
                      <h4 className="text-lg font-bold text-gray-800 mt-2">${(item.price * item.quantity).toFixed(2)}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total Price */}
        <div className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Total Price: ${totalPrice.toFixed(2)}</h2>
        </div>

        {/* Shipping Information */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Shipping Information</h2>
          <form className="mt-4 space-y-4">
            <input type="text" placeholder="Full Name" className="w-full p-2 border border-gray-300 rounded-md" />
            <input type="text" placeholder="Address" className="w-full p-2 border border-gray-300 rounded-md" />
            <input type="text" placeholder="City" className="w-full p-2 border border-gray-300 rounded-md" />
            <input type="text" placeholder="State" className="w-full p-2 border border-gray-300 rounded-md" />
            <input type="text" placeholder="Pin Code" className="w-full p-2 border border-gray-300 rounded-md" />
            <input type="text" placeholder="Country" className="w-full p-2 border border-gray-300 rounded-md" />
          </form>
        </div>

        {/* Payment Information */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Payment Information</h2>
          <form className="mt-4 space-y-4">
            <input type="text" placeholder="Card Number" className="w-full p-2 border border-gray-300 rounded-md" />
            <input type="text" placeholder="Name on Card" className="w-full p-2 border border-gray-300 rounded-md" />
            <input type="text" placeholder="CVV" className="w-full p-2 border border-gray-300 rounded-md" />
          </form>
        </div>
      </div>

      {/* Place Order and Generate Invoice Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Place Order
        </button>
        <button
          onClick={handleGenerateInvoice}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
          Generate Invoice
        </button>
      </div>
    </div>
  );
};

export default Checkout;

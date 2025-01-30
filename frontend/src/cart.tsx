
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from './store';
// import { incrementQuantity, decrementQuantity, removeFromCart } from './cartSlice';
// import { useAuth0 } from '@auth0/auth0-react';

// const Cart: React.FC = () => {
//   const dispatch = useDispatch();
//   const { user, isAuthenticated } = useAuth0();
//   const userId = user?.sub ?? '';

//   const userCart = useSelector((state: RootState) =>
//     state.cart.cartList.find(cart => cart.user === userId)?.cart ?? []
//   );

//   const handleIncrement = (id: number) => {
//     dispatch(incrementQuantity({ user: userId, id }));
//   };

//   const handleDecrement = (id: number) => {
//     dispatch(decrementQuantity({ user: userId, id }));
//   };

//   const handleRemove = (id: number) => {
//     dispatch(removeFromCart({ user: userId, id }));
//   };

//   const totalPrice = userCart.reduce((total, item) => total + item.price * item.quantity, 0);

//   return isAuthenticated ? (
//     <div className="container mx-auto p-4">
//       {userCart.length === 0 ? (
//         <div className="text-center py-10 text-lg font-bold">
//           Your cart is empty!
//         </div>
//       ) : (
//         userCart.map((item) => (
//           <div key={item.id} className="w-full mx-auto bg-gray-400 shadow-md rounded-lg overflow-hidden mt-5">
//             <div className="p-5">
//               <img src={item.image} alt={item.title} className="w-half h-40 object-center rounded-lg" />
//             </div>
//             <div className="px-5 py-2">
//               <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
//               <h3 className="text-md font-medium text-gray-600">{item.category}</h3>
//               <div className="flex items-center mb-2">
//                 <h3 className="text-md font-medium text-gray-600">{item.rating.rate}</h3>
//                 <span className="text-sm font-light text-gray-500">({item.rating.count})</span>
//               </div>
//               <h4 className="text-lg font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</h4>
//               <p className="text-sm font-light text-gray-600">{item.description}</p>
//               <div className="flex items-center mb-2">
//                 <button
//                   onClick={() => handleDecrement(item.id)}
//                   className="bg-gray-300 text-gray-800 py-1 px-3 rounded-l hover:bg-gray-400"
//                 >
//                   -
//                 </button>
//                 <span className="px-4">{item.quantity}</span>
//                 <button
//                   onClick={() => handleIncrement(item.id)}
//                   className="bg-gray-300 text-gray-800 py-1 px-3 rounded-r hover:bg-gray-400"
//                 >
//                   +
//                 </button>
//               </div>
//               <button
//                 onClick={() => handleRemove(item.id)}
//                 className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))
//       )}
      
//       {/* Total price */}
//       <div className="mt-8 p-4 bg-gray-200 rounded-lg">
//         <h2 className="text-xl font-bold">Total Price: ${totalPrice.toFixed(2)}</h2>
//       </div>
//     </div>
//   ) : (
//     <div className="flex items-center justify-center h-screen">
//       <div className="text-center p-6 bg-red-100 border border-red-400 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-red-700">Access Denied</h2>
//         <p className="mt-2 text-lg text-red-600">You do not have access to the cart.</p>
//       </div>
//     </div>
//   );
// };

// export default Cart;

// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from './store';
// import { incrementQuantity, decrementQuantity, removeFromCart } from './cartSlice';
// import { useAuth0 } from '@auth0/auth0-react';

// const Cart: React.FC = () => {
//   const dispatch = useDispatch();
//   const { user, isAuthenticated } = useAuth0();
//   const userId = user?.sub ?? '';

//   const userCart = useSelector((state: RootState) =>
//     state.cart.cartList.find(cart => cart.user === userId)?.cart ?? []
//   );

//   const handleIncrement = (id: number) => {
//     dispatch(incrementQuantity({ user: userId, id }));
//   };

//   const handleDecrement = (id: number) => {
//     dispatch(decrementQuantity({ user: userId, id }));
//   };

//   const handleRemove = (id: number) => {
//     dispatch(removeFromCart({ user: userId, id }));
//   };

//   const totalPrice = userCart.reduce((total, item) => total + item.price * item.quantity, 0);

//   return isAuthenticated ? (
//     <div className="container mx-auto p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
//       {userCart.length === 0 ? (
//         <div className="text-center py-8 text-lg font-semibold text-gray-700">
//           Your cart is empty!
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {userCart.map((item) => (
//             <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
//               <div className="flex p-4">
//                 <img src={item.image} alt={item.title} className="w-32 h-32 object-cover rounded-lg border border-gray-200" />
//                 <div className="ml-4 flex-1">
//                   <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
//                   <p className="text-md font-medium text-gray-600">{item.category}</p>
//                   <div className="flex items-center mt-2 mb-2">
//                     <span className="text-md font-medium text-gray-700">{item.rating.rate}</span>
//                     <span className="text-sm font-light text-gray-500 ml-2">({item.rating.count})</span>
//                   </div>
//                   <h4 className="text-lg font-bold text-gray-800 mt-2">${(item.price * item.quantity).toFixed(2)}</h4>
//                   <p className="text-sm text-gray-600 mt-2">{item.description}</p>
//                   <div className="flex items-center mt-4">
//                     <button
//                       onClick={() => handleDecrement(item.id)}
//                       className="bg-gray-200 text-gray-800 py-1 px-3 rounded-l-md hover:bg-gray-300 transition-colors"
//                     >
//                       -
//                     </button>
//                     <span className="px-4 py-1 text-gray-800 border-t border-b border-gray-300">{item.quantity}</span>
//                     <button
//                       onClick={() => handleIncrement(item.id)}
//                       className="bg-gray-200 text-gray-800 py-1 px-3 rounded-r-md hover:bg-gray-300 transition-colors"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <button
//                     onClick={() => handleRemove(item.id)}
//                     className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
      
//       {/* Total price */}
//       <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-md border border-gray-200">
//         <h2 className="text-2xl font-semibold text-gray-800">Total Price: ${totalPrice.toFixed(2)}</h2>
//       </div>
//     </div>
//   ) : (
//     <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-50 to-red-100">
//       <div className="text-center p-6 bg-red-100 border border-red-300 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-red-700">Access Denied</h2>
//         <p className="mt-2 text-lg text-red-600">You do not have access to the cart.</p>
//       </div>
//     </div>
//   );
// };

// export default Cart;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { incrementQuantity, decrementQuantity, removeFromCart } from './cartSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const userId = user?.sub ?? '';

  const userCart = useSelector((state: RootState) =>
    state.cart.cartList.find(cart => cart.user === userId)?.cart ?? []
  );

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity({ user: userId, id }));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity({ user: userId, id }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart({ user: userId, id }));
  };

  const totalPrice = userCart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return isAuthenticated ? (
    <div className="container mx-auto p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      {userCart.length === 0 ? (
        <div className="text-center py-8 text-lg font-semibold text-gray-700">
          Your cart is empty!
        </div>
      ) : (
        <div className="space-y-6">
          {userCart.map((item) => (
            <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
              <div className="flex p-4">
                <img src={item.image} alt={item.title} className="w-32 h-32 object-cover rounded-lg border border-gray-200" />
                <div className="ml-4 flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-md font-medium text-gray-600">{item.category}</p>
                  <div className="flex items-center mt-2 mb-2">
                    <span className="text-md font-medium text-gray-700">{item.rating.rate}</span>
                    <span className="text-sm font-light text-gray-500 ml-2">({item.rating.count})</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mt-2">${(item.price * item.quantity).toFixed(2)}</h4>
                  <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                  <div className="flex items-center mt-4">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="bg-gray-200 text-gray-800 py-1 px-3 rounded-l-md hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-gray-800 border-t border-b border-gray-300">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="bg-gray-200 text-gray-800 py-1 px-3 rounded-r-md hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Total price */}
      <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Total Price: ${totalPrice.toFixed(2)}</h2>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        className="mt-8 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Checkout
      </button>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-50 to-red-100">
      <div className="text-center p-6 bg-red-100 border border-red-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-red-700">Access Denied</h2>
        <p className="mt-2 text-lg text-red-600">You do not have access to the cart.</p>
      </div>
    </div>
  );
};

export default Cart;

// // App.tsx
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ProductList from './product';
// import ProductDetail from './ProductDetail';
// import Navbar from './navbar';
// import Cart from './cart';
// import LoginButton from './login';
// import Profile from './profile';
// import Portal from './portal';
// import Dashboard from './Dashboard';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import store, { persistor } from './store';
// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<ProductList />} />
//           <Route path="/details/:id" element={<ProductDetail />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/login" element={<LoginButton />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/portal" element={<Portal />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </Router>
//       </PersistGate>
//     </Provider>
//   );
// };

// export default App;
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ProductList from './product';
// import ProductDetail from './ProductDetail';
// import Navbar from './navbar';
// import Cart from './cart';
// import LoginButton from './login';
// import Profile from './profile';
// import Portal from './portal';
// import Dashboard from './Dashboard';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import store, { persistor } from './store';
// import Checkout from './Checkout';
// import OrderSuccess from './OrderSuccess';

// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <Router>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<ProductList />} />
//             <Route path="/details/:id" element={<ProductDetail />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/login" element={<LoginButton />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/portal" element={<Portal />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/order-success" element={<OrderSuccess />} />
//           </Routes>
//         </Router>
//       </PersistGate>
//     </Provider>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

import Navbar from './navbar';
import ProductList from './product';
import ProductDetail from './ProductDetail';
import Cart from './cart';
import LoginButton from './login';
import Profile from './profile';
import Portal from './portal';
import Dashboard from './Dashboard';
import Checkout from './Checkout';
import OrderSuccess from './OrderSuccess';

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/details/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginButton />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </Router>
    </PersistGate>
  </Provider>
);

export default App;

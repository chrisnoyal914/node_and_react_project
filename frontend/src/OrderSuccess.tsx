// OrderSuccess.tsx
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { generatePDF } from './generateInvoice';
import Invoice from './Invoice';

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownloadInvoice = () => {
    if (invoiceRef.current) {
      generatePDF(invoiceRef.current);
    }
  };

  const items = [
    { id: 1, title: 'Product 1', quantity: 2, price: 29.99, total: 59.98 },
    { id: 2, title: 'Product 2', quantity: 1, price: 49.99, total: 49.99 },
  ];
  const totalPrice = items.reduce((total, item) => total + item.total, 0);
  const orderNumber = '12345';
  const customerName = 'John Doe';
  const address = '123 Main St, Anytown, USA';

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <div className="text-center p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-green-800 mb-4">Order Placed Successfully!</h1>
        <p className="text-lg text-gray-700 mb-4">Thank you for your purchase. Your order has been placed successfully.</p>
        <button
          onClick={handleDownloadInvoice}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Download Invoice
        </button>
        <button
          onClick={() => navigate('/')}
          className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Continue Shopping
        </button>
      </div>

      {/* Invoice Component */}
      <div ref={invoiceRef} style={{ display: 'none' }}>
        <Invoice
          items={items}
          totalPrice={totalPrice}
          orderNumber={orderNumber}
          customerName={customerName}
          address={address}
        />
      </div>
    </div>
  );
};

export default OrderSuccess;

import React from 'react';

interface InvoiceProps {
  items: { id: number; title: string; quantity: number; price: number; total: number }[];
  totalPrice: number;
  orderNumber: string;
  customerName: string;
  address: string;
}

const Invoice: React.FC<InvoiceProps> = ({ items, totalPrice, orderNumber, customerName, address }) => {
  return (
    <div>
      <h1>Invoice</h1>
      <p><strong>Order Number:</strong> {orderNumber}</p>
      <p><strong>Customer Name:</strong> {customerName}</p>
      <p><strong>Address:</strong> {address}</p>
      <table border={1} cellPadding="4" style={{ width: '100%', borderCollapse: 'collapse' }}>

        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
    </div>
  );
};

export default Invoice;

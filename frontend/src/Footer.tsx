// Footer.tsx
//import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4">
            <h4 className="text-lg font-semibold mb-2">JJ CART LIMITED</h4>
            <ul>
              <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/about" className="hover:underline">About Us</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4">
            <h4 className="text-lg font-semibold mb-2">Contact</h4>
            <ul>
              <li><a href="mailto:jjcart@gmail.com" className="hover:underline">Email Us</a></li>
              <li><a href="tel:+2233667799" className="hover:underline">Call Us: +2233667799</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <ul>
              <li><a href="https://twitter.com" className="hover:underline">Twitter</a></li>
              <li><a href="https://facebook.com" className="hover:underline">Facebook</a></li>
              <li><a href="https://instagram.com" className="hover:underline">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm mt-4">
          <p>&copy; {new Date().getFullYear()} JJCART.COM All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

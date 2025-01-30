import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';  

interface Products {
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

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [search, setSearch] = useState('');
  const [load, setLoad] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    Axios.get('https://fakestoreapi.com/products').then((result) => {
      setProducts(result.data);
      setLoad(false);
    });
    Axios.get('https://fakestoreapi.com/products/categories').then((result) => {
      setCategories(result.data);
      setLoad(false);
    });
  }, []);

  const handleNavigate = (id: number) => {
    navigate(`/details/${id}`);
  };

  const handleSelectForComparison = (id: number) => {
    setSelectedForComparison((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  const filteredProducts = products.filter((product) => {
    const inCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    const inSearch = product.title.toLowerCase().includes(search.toLowerCase());
    return inCategory && inPriceRange && inSearch;
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (load) {
    return (
      <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
        <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
          <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
          <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
          <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
          <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
          <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
          <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
          <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
          <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        </svg>
        <span className="text-4xl font-medium text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 hover:outline">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Filters</h2>
        <div className="flex space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded hover:outline"
          >
            <option value="all">Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="flex space-x-2 items-center">
            <label htmlFor="minPrice" className="text-sm">Min Price ($):</label>
            <input
              type="number"
              id="minPrice"
              value={priceRange[0]}
              onChange={(e) => {
                const priceRangeVal = e.target.value;
                if (+priceRangeVal >= 0 && +priceRangeVal <= 1000) {
                  setPriceRange([+e.target.value, priceRange[1]]);
                }
              }}
              className="p-2 border rounded w-20 hover:outline"
            />
            <label htmlFor="maxPrice" className="text-sm">Max Price ($):</label>
            <input
              type="number"
              id="maxPrice"
              value={priceRange[1]}
              onChange={(e) => {
                const priceRangeVal = e.target.value;
                if (+priceRangeVal >= 0 && +priceRangeVal <= 1000) {
                  setPriceRange([priceRange[0], +priceRangeVal]);
                }
              }}
              className="p-2 border rounded w-20 hover:outline"
            />
            <input
              className="flex justify-center"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:outline relative">
            <input
              type="checkbox"
              className="absolute top-2 right-2"
              checked={selectedForComparison.includes(product.id)}
              onChange={() => handleSelectForComparison(product.id)}
            />
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-60 object-contain"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.title.length > 30 ? `${product.title.substring(0, 30)}...` : product.title}</h2>
              <p className="text-gray-600 text-sm truncate">{product.description}</p>
              <p className="text-lg font-bold text-green-600 mt-2">${product.price}</p>
              <div className="text-yellow-500">
                {'★'.repeat(Math.round(product.rating.rate))}
                {'☆'.repeat(5 - Math.round(product.rating.rate))}
                <span className="text-gray-600 text-sm ml-2">({product.rating.count} reviews)</span>
              </div>
              <button
                onClick={() => handleNavigate(product.id)}
                className="bg-green-600 text-white mt-4 py-2 px-10 rounded hover:bg-green-700 transition duration-300"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedForComparison.length > 0 && (
        <div className="comparison-section mt-6">
          <h2 className="text-2xl font-semibold mb-4">Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.filter(product => selectedForComparison.includes(product.id)).map(product => (
              <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-60 object-contain mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-600 text-sm mb-2 truncate">{product.description}</p>
                <p className="text-lg font-bold text-green-600 mb-2">${product.price}</p>
                <div className="text-yellow-500 mb-2">
                  {'★'.repeat(Math.round(product.rating.rate))}
                  {'☆'.repeat(5 - Math.round(product.rating.rate))}
                  <span className="text-gray-600 text-sm ml-2">({product.rating.count} reviews)</span>
                </div>
                {/* Add any other details you want to include here */}
              </div>
            ))}
          </div>
        </div>
      )}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          aria-label="Back to top"
        >
          ↑BACK TO TOP
        </button>
      )}

      <Footer />  {/* Add Footer here */}
    </div>
  );
}

export default ProductList;

/*import { useState, useEffect } from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function Portal() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth0();
  const [isMail, setMail] = useState(false);
  const [view, setView] = useState('all');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (user?.email === 'edwij43@gmail.com' || user?.email === 'edwij43@gmail.com') {
      setMail(true);
    }
  }, [user]);

  const handleEdit = (id) => {
    const product = products.find((product) => product.id === id);
    setTitle(product.title);
    setDescription(product.description);
    setImage(product.image);
    setEditId(id);
    setView('edit');
  };

  useEffect(() => {
    Axios.get('https://fakestoreapi.com/products').then((result) => {
      setProducts(result.data);
    });
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      title,
      description,
      image,
    };

    Axios.post('https://fakestoreapi.com/products', newProduct).then((response) => {
      console.log(response.data);
      alert('Product added');
      setProducts([...products, response.data]);
      setTitle('');
      setDescription('');
      setImage('');
      setView('all');
    });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const updatedProduct = {
      title,
      description,
      image,
    };

    Axios.put(`https://fakestoreapi.com/products/${editId}`, updatedProduct).then((response) => {
      console.log(response.data);
      alert('Product updated');
      setProducts(products.map((product) => (product.id === editId ? response.data : product)));
      setTitle('');
      setDescription('');
      setImage('');
      setEditId(null);
      setView('all');
    });
  };

  const handleDeleteProduct = (id) => {
    alert('Product removed');
    Axios.delete(`https://fakestoreapi.com/products/${id}`).then(() => {
      setProducts(products.filter((product) => product.id !== id));
    });
  };

  if (!isMail) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <div className="flex flex-col w-full md:w-1/6 sticky top-0 bg-gray-500 h-auto md:h-screen p-4 md:p-6">
        <button
          onClick={() => setView('all')}
          className="bg-blue-600 hover:bg-blue-800 text-white mb-4 py-2 px-4 rounded"
        >
          All
        </button>
        <button
          onClick={() => setView('add')}
          className="bg-green-600 hover:bg-green-800 text-white mb-4 py-2 px-4 rounded"
        >
          Add
        </button>
      </div>
      <div className="w-full md:w-5/6 ml-0 md:ml-6 p-4 md:p-6">
        {view === 'all' && (
          <div className="bg-gray-100 flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-5">
            {products.map((product) => (
              <div className="flex bg-gray-400 p-4 rounded-lg shadow-md flex-col w-full md:w-1/2 lg:w-1/3" key={product.id}>
                <div className="flex flex-col w-full">
                  <div className="text-lg font-bold mb-2">{product.title}</div>
                  <div className="mb-4">
                    <img
                      src={product.image}
                      className="w-full h-40 object-cover"
                      alt={product.title}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex space-x-2 mb-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                        onClick={() => handleEdit(product.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="text-gray-700 overflow-hidden text-ellipsis whitespace-normal">
                      {product.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {view === 'add' && (
          <div className="flex justify-center p-6">
            <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg" onSubmit={handleAddProduct}>
              <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Description</label>
                <textarea
                  className="w-full border px-3 py-2 rounded"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Image URL</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
              >
                Add Product
              </button>
            </form>
          </div>
        )}
        {view === 'edit' && (
          <div className="flex justify-center p-6">
            <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg" onSubmit={handleUpdateProduct}>
              <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Description</label>
                <textarea
                  className="w-full border px-3 py-2 rounded"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Image URL</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
              >
                Update Product
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Portal;*/
// import { useState, useEffect } from "react";
// import Axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react";

// function Portal() {
//   const [products, setProducts] = useState([]);
//   const { user } = useAuth0();
//   const [isMail, setMail] = useState(false);
//   const [view, setView] = useState('all');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState('');
//   const [editId, setEditId] = useState(null);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     if (user?.email === 'josephjaison00724@gmail.com' || user?.email === 'josephjaison0007@gmail.com') {
//       setMail(true);
//     }
//   }, [user]);

//   useEffect(() => {
//     Axios.get('https://fakestoreapi.com/products').then((result) => {
//       setProducts(result.data);
//     });
//   }, []);

//   const handleEdit = (id) => {
//     const product = products.find((product) => product.id === id);
//     setTitle(product.title);
//     setDescription(product.description);
//     setImage(product.image);
//     setEditId(id);
//     setView('edit');
//   };

//   const handleAddProduct = (e) => {
//     e.preventDefault();
//     const newProduct = {
//       title,
//       description,
//       image,
//     };

//     Axios.post('https://fakestoreapi.com/products', newProduct).then((response) => {
//       console.log(response.data);
//       alert('Product added');
//       setProducts([...products, response.data]);
//       setTitle('');
//       setDescription('');
//       setImage('');
//       setView('all');
//     });
//   };

//   const handleUpdateProduct = (e) => {
//     e.preventDefault();
//     const updatedProduct = {
//       title,
//       description,
//       image,
//     };

//     Axios.put(`https://fakestoreapi.com/products/${editId}`, updatedProduct).then((response) => {
//       console.log(response.data);
//       alert('Product updated');
//       setProducts(products.map((product) => (product.id === editId ? response.data : product)));
//       setTitle('');
//       setDescription('');
//       setImage('');
//       setEditId(null);
//       setView('all');
//     });
//   };

//   const handleDeleteProduct = (id) => {
//     alert('Product removed');
//     Axios.delete(`https://fakestoreapi.com/products/${id}`).then(() => {
//       setProducts(products.filter((product) => product.id !== id));
//     });
//   };

//   if (!isMail) {
//     return null;
//   }

//   // Filter products based on search input
//   const filteredProducts = products.filter((product) =>
//     product.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
//       <div className="flex flex-col w-full md:w-1/4 sticky top-0 bg-gray-800 h-auto md:h-screen p-4">
//         <button
//           onClick={() => setView('all')}
//           className="bg-indigo-600 hover:bg-indigo-800 text-white mb-4 py-2 px-4 rounded"
//         >
//           All Products
//         </button>
//         <button
//           onClick={() => setView('add')}
//           className="bg-green-600 hover:bg-green-800 text-white mb-4 py-2 px-4 rounded"
//         >
//           Add Product
//         </button>
//         {view === 'all' && (
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full p-2 border rounded mb-4"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         )}
//       </div>
//       <div className="w-full md:w-3/4 p-4">
//         {view === 'all' && (
//           <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
//             {filteredProducts.map((product) => (
//               <div className="flex bg-white p-4 rounded-lg shadow-md flex-col w-full md:w-1/2 lg:w-1/3" key={product.id}>
//                 <div className="flex flex-col w-full">
//                   <div className="text-xl font-semibold mb-2">{product.title}</div>
//                   <div className="mb-4">
//                     <img
//                       src={product.image}
//                       className="w-full h-48 object-cover rounded"
//                       alt={product.title}
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <div className="flex space-x-2 mb-2">
//                       <button
//                         className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded"
//                         onClick={() => handleEdit(product.id)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded"
//                         onClick={() => handleDeleteProduct(product.id)}
//                       >
//                         Remove
//                       </button>
//                     </div>
//                     <div className="text-gray-800">
//                       {product.description}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//         {view === 'add' && (
//           <div className="flex justify-center p-6">
//             <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg" onSubmit={handleAddProduct}>
//               <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
//               <div className="mb-4">
//                 <label className="block mb-2 text-gray-700">Title</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 px-3 py-2 rounded"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2 text-gray-700">Description</label>
//                 <textarea
//                   className="w-full border border-gray-300 px-3 py-2 rounded"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2 text-gray-700">Image URL</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 px-3 py-2 rounded"
//                   value={image}
//                   onChange={(e) => setImage(e.target.value)}
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 rounded"
//               >
//                 Add Product
//               </button>
//             </form>
//           </div>
//         )}
//         {view === 'edit' && (
//           <div className="flex justify-center p-6">
//             <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg" onSubmit={handleUpdateProduct}>
//               <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
//               <div className="mb-4">
//                 <label className="block mb-2 text-gray-700">Title</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 px-3 py-2 rounded"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2 text-gray-700">Description</label>
//                 <textarea
//                   className="w-full border border-gray-300 px-3 py-2 rounded"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2 text-gray-700">Image URL</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 px-3 py-2 rounded"
//                   value={image}
//                   onChange={(e) => setImage(e.target.value)}
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 rounded"
//               >
//                 Update Product
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Portal;
import { useState, useEffect } from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function Portal() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth0();
  const [isMail, setMail] = useState(false);
  const [view, setView] = useState("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (
      user?.email === "josephjaison00724@gmail.com" ||
      user?.email === "josephjaison0007@gmail.com"
    ) {
      setMail(true);
    }
  }, [user]);

  useEffect(() => {
    Axios.get("https://fakestoreapi.com/products")
      .then((result) => {
        setProducts(result.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleEdit = (id) => {
    const product = products.find((product) => product.id === id);
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setImage(product.image);
      setEditId(id);
      setView("edit");
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      title,
      description,
      image,
    };

    Axios.post("https://fakestoreapi.com/products", newProduct)
      .then((response) => {
        alert("Product added successfully!");
        setProducts([...products, response.data]);
        setTitle("");
        setDescription("");
        setImage("");
        setView("all");
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const updatedProduct = {
      title,
      description,
      image,
    };

    Axios.put(`https://fakestoreapi.com/products/${editId}`, updatedProduct)
      .then((response) => {
        alert("Product updated successfully!");
        setProducts(
          products.map((product) =>
            product.id === editId ? response.data : product
          )
        );
        setTitle("");
        setDescription("");
        setImage("");
        setEditId(null);
        setView("all");
      })
      .catch((err) => console.error("Error updating product:", err));
  };

  const handleDeleteProduct = (id) => {
    Axios.delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
        alert("Product removed successfully!");
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  if (!isMail) {
    return null;
  }

  // Filter products based on search input
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      <div className="flex flex-col w-full md:w-1/4 sticky top-0 bg-gray-800 h-auto md:h-screen p-4">
        <button
          onClick={() => setView("all")}
          className="bg-indigo-600 hover:bg-indigo-800 text-white mb-4 py-2 px-4 rounded"
        >
          All Products
        </button>
        <button
          onClick={() => setView("add")}
          className="bg-green-600 hover:bg-green-800 text-white mb-4 py-2 px-4 rounded"
        >
          Add Product
        </button>
        {view === "all" && (
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 border rounded mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </div>
      <div className="w-full md:w-3/4 p-4">
        {view === "all" && (
          <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
            {filteredProducts.map((product) => (
              <div
                className="flex bg-white p-4 rounded-lg shadow-md flex-col w-full md:w-1/2 lg:w-1/3"
                key={product.id}
              >
                <div className="flex flex-col w-full">
                  <div className="text-xl font-semibold mb-2">{product.title}</div>
                  <img
                    src={product.image}
                    className="w-full h-48 object-cover rounded mb-4"
                    alt={product.title}
                  />
                  <div className="text-gray-800">{product.description}</div>
                  <div className="flex space-x-2 mt-4">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {view === "add" && (
          <AddEditProductForm
            title={title}
            description={description}
            image={image}
            setTitle={setTitle}
            setDescription={setDescription}
            setImage={setImage}
            onSubmit={handleAddProduct}
            formType="Add"
          />
        )}
        {view === "edit" && (
          <AddEditProductForm
            title={title}
            description={description}
            image={image}
            setTitle={setTitle}
            setDescription={setDescription}
            setImage={setImage}
            onSubmit={handleUpdateProduct}
            formType="Edit"
          />
        )}
      </div>
    </div>
  );
}

function AddEditProductForm({
  title,
  description,
  image,
  setTitle,
  setDescription,
  setImage,
  onSubmit,
  formType,
}) {
  return (
    <div className="flex justify-center p-6">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
        onSubmit={onSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">{formType} Product</h2>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Description</label>
          <textarea
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Image URL</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 rounded"
        >
          {formType} Product
        </button>
      </form>
    </div>
  );
}

export default Portal;

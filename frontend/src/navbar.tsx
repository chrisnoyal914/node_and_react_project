// import { Link } from 'react-router-dom';
// import LoginButton from './login';
// //import LogoutButton from './logout';
// import { useAuth0 } from '@auth0/auth0-react';


// function Navbar() {
//   const {user,isAuthenticated} = useAuth0()

//   console.log(user)
//   return (
//     <div className="navbar bg-black shadow-md py-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-5xl font-bold text-red-800">
//           JJ CART
//         </Link>
        
        
//           {/* <input className='w-96 ' type="text" placeholder='search...' /> */}
//           {/*<LoginButton />*/}
//           {/* <LogoutButton/> */}

//         <ul className="flex space-x-4">
//           <li>
//             <Link to="/" className="text-blue-600 hover:text-gray-100">
//               HOME
//             </Link>
//           </li>
//           <li>
//             <Link to="/cart" className="text-blue-600 hover:text-gray-100">
//               CART
//             </Link>
//             </li>
//             <li>
//             <Link to="/profile" className="text-blue-600 hover:text-gray-100">
//             PROFILE
//             </Link>
//             {/* {
//             <img 
//             onClick={() =>window.location.href='/profile'}
//             className=' w-10' src={user?.picture} alt='img'/>:''
//             } */}

//           </li>
          
//         </ul>
//         {isAuthenticated? <div>
//           <img className='w-7 h-7 rounded-full' onClick={()=>window.location.href='/profile'}
//             src={user?.picture} alt="pic" />
//         </div>:<LoginButton/>}
     
//       </div>
//     </div>
//   );
// }

  
// export default Navbar;

import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { FaShoppingCart } from 'react-icons/fa'; 
import { useSelector } from 'react-redux'; // 
import { RootState } from './store'; 
import LoginButton from './login';
// import LogoutButton from './logout';

function Navbar() {
  const { user, isAuthenticated } = useAuth0();
  const cartItems = useSelector((state: RootState) => state.cart.cartList); 
  console.log(cartItems);
  let itemCount = 0
  
  cartItems.map((item)=>{
    if(item.user === user?.sub){
      itemCount = item.cart.length 
    }
  })

  return (
    <div className="navbar bg-black shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-5xl font-bold text-red-800">
          JJ CART
        </Link>
        
        <ul className="flex space-x-4 items-center">
          <li>
            <Link to="/" className="text-blue-600 hover:text-gray-100">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/cart" className="relative flex items-center">
              <FaShoppingCart className="text-blue-600 text-3xl hover:text-gray-100 transition-transform transform hover:scale-110" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1 translate-x-1/2 -translate-y-1/2">
                  {itemCount}
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-blue-600 hover:text-gray-100">
              PROFILE
            </Link>
          </li>
        </ul>
        {isAuthenticated ? (
          <div>
            <img
              className="w-7 h-7 rounded-full"
              onClick={() => window.location.href = '/profile'}
              src={user?.picture}
              alt="User Profile"
            />
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}

export default Navbar;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
}

interface UserCart {
  user: string;
  cart: CartItem[];
  total: number;
}

export interface InitialState {
  cartList: UserCart[];
}

const initialState: InitialState = {
  cartList: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ user: string; product: CartItem }>) => {
      const { user, product } = action.payload;
      const userCart = state.cartList.find(cart => cart.user === user);

      if (userCart) {
        const existingProduct = userCart.cart.find(item => item.id === product.id);
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          userCart.cart.push({ ...product, quantity: 1 });
        }
        userCart.total = userCart.cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
      } else {
        state.cartList.push({
          user,
          cart: [{ ...product, quantity: 1 }],
          total: product.price,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ user: string; id: number }>) => {
      const { user, id } = action.payload;
      const userCart = state.cartList.find(cart => cart.user === user);

      if (userCart) {
        userCart.cart = userCart.cart.filter(item => item.id !== id);
        userCart.total = userCart.cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
      }
    },
    incrementQuantity: (state, action: PayloadAction<{ user: string; id: number }>) => {
      const { user, id } = action.payload;
      const userCart = state.cartList.find(cart => cart.user === user);

      if (userCart) {
        const product = userCart.cart.find(item => item.id === id);
        if (product) {
          product.quantity += 1;
          userCart.total = userCart.cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
        }
      }
    },
    decrementQuantity: (state, action: PayloadAction<{ user: string; id: number }>) => {
      const { user, id } = action.payload;
      const userCart = state.cartList.find(cart => cart.user === user);

      if (userCart) {
        const product = userCart.cart.find(item => item.id === id);
        if (product && product.quantity > 1) {
          product.quantity -= 1;
        } else if (product) {
          userCart.cart = userCart.cart.filter(item => item.id !== id);
        }
        userCart.total = userCart.cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
      }
    },
    setCart: (state, action: PayloadAction<{ user: string; cart: CartItem[] }>) => {
      const { user, cart } = action.payload;
      const userCart = state.cartList.find(cart => cart.user === user);

      if (userCart) {
        userCart.cart = cart;
        userCart.total = cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
      } else {
        state.cartList.push({
          user,
          cart,
          total: cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0),
        });
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, setCart } = cartSlice.actions;
export default cartSlice.reducer;

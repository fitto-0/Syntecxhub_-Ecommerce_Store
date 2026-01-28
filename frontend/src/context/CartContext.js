import React, { createContext, useReducer } from 'react';

export const CartContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  totalPrice: 0,
  loading: false,
  error: null,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find((item) => item.productId === action.payload.productId);
      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.productId === action.payload.productId ? { ...item, quantity: item.quantity + action.payload.quantity } : item
        );
      } else {
        // Generate a unique ID for the cart item if not present
        const newItem = {
          ...action.payload,
          _id: action.payload._id || `${action.payload.productId}-${Date.now()}`,
        };
        updatedItems = [...state.items, newItem];
      }
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };
    }

    case 'REMOVE_FROM_CART': {
      const filteredItems = state.items.filter((item) => item._id !== action.payload && item.productId !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(filteredItems));
      return { ...state, items: filteredItems };
    }

    case 'UPDATE_QUANTITY': {
      const updatedCart = state.items.map((item) =>
        (item._id === action.payload.itemId || item.productId === action.payload.itemId) ? { ...item, quantity: action.payload.quantity } : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return { ...state, items: updatedCart };
    }

    case 'CLEAR_CART':
      localStorage.removeItem('cartItems');
      return { ...state, items: [] };

    case 'SET_CART':
      localStorage.setItem('cartItems', JSON.stringify(action.payload.items));
      return { ...state, items: action.payload.items, totalPrice: action.payload.totalPrice };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

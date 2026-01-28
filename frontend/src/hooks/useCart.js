import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { cartService } from '../services/api';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const addToCart = async (productId, quantity) => {
    try {
      context.dispatch({ type: 'ADD_TO_CART', payload: { productId, quantity } });
      await cartService.addToCart({ productId, quantity });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      context.dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
      await cartService.removeFromCart(itemId);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      context.dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
      await cartService.updateCartItem(itemId, quantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      context.dispatch({ type: 'CLEAR_CART' });
      await cartService.clearCart();
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  };

  return {
    ...context,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};

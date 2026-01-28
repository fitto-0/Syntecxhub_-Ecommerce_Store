import { useContext, useMemo } from 'react';
import { CartContext } from '../context/CartContext';
import { cartService, productService } from '../services/api';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const addToCart = async (productId, quantity) => {
    try {
      // Fetch product details to get price and images
      const productResponse = await productService.getProductById(productId);
      const product = productResponse.data.product;
      const price = product.discountedPrice || product.price;
      
      context.dispatch({ 
        type: 'ADD_TO_CART', 
        payload: { 
          productId, 
          quantity, 
          price,
          productData: {
            name: product.name,
            images: product.images,
            discountedPrice: product.discountedPrice,
            originalPrice: product.price
          }
        } 
      });
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

  // Calculate total price dynamically
  const totalPrice = useMemo(() => {
    return context.items.reduce((sum, item) => {
      const price = item.price || (item.productData?.discountedPrice || item.productData?.originalPrice || 0);
      return sum + (price * (item.quantity || 1));
    }, 0);
  }, [context.items]);

  // Calculate total items
  const totalItems = useMemo(() => {
    return context.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }, [context.items]);

  return {
    ...context,
    totalPrice,
    totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};

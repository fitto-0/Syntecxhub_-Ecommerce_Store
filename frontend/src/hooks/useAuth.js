import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/api';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const login = async (email, password) => {
    try {
      context.dispatch({ type: 'LOGIN_START' });
      const response = await authService.login(email, password);
      context.dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      context.dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response?.data?.message || 'Login failed',
      });
      throw error;
    }
  };

  const logout = () => {
    context.dispatch({ type: 'LOGOUT' });
  };

  const register = async (userData) => {
    try {
      context.dispatch({ type: 'LOGIN_START' });
      const response = await authService.register(userData);
      context.dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      context.dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response?.data?.message || 'Registration failed',
      });
      throw error;
    }
  };

  return {
    ...context,
    login,
    logout,
    register,
  };
};

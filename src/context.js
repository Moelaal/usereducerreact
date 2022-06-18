import React, { useState, useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';

const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    cart: cartItems,
    total: 0,
    amount: 0,
  });
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE', payload: id });
  };
  const increaseItem = (id) => {
    dispatch({ type: 'INCREASE', payload: id });
  };

  const decreaseItem = (id) => {
    dispatch({ type: 'DECREASE', payload: id });
  };
  const fetchItem = async () => {
    dispatch({ type: 'LOADING' });
    const response = await fetch(url);
    const data = await response.json();
    dispatch({ type: 'DISPLAY_ITEMS', payload: data });
  };
  const toggleItem = (id, type) => {
    dispatch({ type: 'TOGGLE_ITEMS', payload: { id, type } });
  };

  useEffect(() => {
    fetchItem();
  }, []);
  useEffect(() => {
    dispatch({ type: 'GET_TOTAL' });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItem,
        decreaseItem,
        toggleItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

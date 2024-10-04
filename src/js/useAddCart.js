import { useContext } from "react";
import Context from "./context";
import { ACTION } from "./reducer";

export const useAddCart = () => {
  const { state, dispatch } = useContext(Context);

  const addToCart = (product) => {
    const existingProductIndex = state.cart.findIndex(item => 
      item.productId === product.productId && 
      item.variantId === product.variantId 
    );

    if (existingProductIndex !== -1) {
      const updatedCart = state.cart.map((item, index) => 
        index === existingProductIndex 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      dispatch({ type: ACTION.UPDATE_CART, payload: updatedCart });
    } else {
      const newProduct = { ...product, quantity: 1 };
      const updatedCart = [...state.cart, newProduct];
      dispatch({ type: ACTION.UPDATE_CART, payload: updatedCart });
    }
  };

  return { state, addToCart };
};

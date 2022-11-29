import React, { useReducer } from 'react'

const CartContext = React.createContext();

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    // group items for same type
    // manage the amount per item basis
    // update total price for all aggregated items

    const existingCartItemIndex = state.items.findIndex( (item) => item.id === action.item.id );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    if (existingCartItem) {
      // if items exist already
      const updatedItem = {
        ...existingCartItem,
        quantityOfItems: existingCartItem.quantityOfItems + action.item.quantityOfItems,
      };
      updatedItems = [...state.items]; //state ko copy kiya 
      updatedItems[existingCartItemIndex] = updatedItem; // and updated ko usme copt kar diya hai 
    } else {
      //add new item for the first time
      updatedItems = state.items.concat(action.item);
    }

    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.quantityOfItems;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex( (item) => item.id === action.id );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.quantityOfItems === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, quantityOfItems: existingItem.quantityOfItems - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState
}


const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item) => { 
      dispatchCartAction({ type: "ADD", item: item });
    };
    const removeItemFromCartHandler = (id) => { 
      dispatchCartAction({ type: "REMOVE", id: id });
    };

    const cartContext = {
        items : cartState.items,
        totalAmount : cartState.totalAmount,
        addItem : addItemToCartHandler,
        removeItem : removeItemFromCartHandler
    }

  return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}

export { CartProvider, CartContext }
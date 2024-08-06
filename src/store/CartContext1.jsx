import { createContext, useReducer } from "react";

const CartContext = createContext ({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
});

function cartReducer (state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingCartItem = state.items.findIndex((item) => item.id === action.item.id);
    const updatedItems = [...state.items];
    if (existingCartItem > -1) {
        const existingItem = state.items[existingCartItem];
        const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + 1
        }
        console.log(existingItem, 'neshto');
        updatedItems[existingCartItem] = updatedItem;
    } else {
        updatedItems.push({...action.item, quantity : 1})        
        }
        return {...state, items: updatedItems}
    }
  if (action.type === 'REMOVE_ITEM') {
    const existingCartItem = state.items.findIndex((item) => item.id === action.item.id);
    const updatedItems = [...state.items];
    const existingItem = updatedItems[existingCartItem];
    if (existingCartItem.quantity === 1) {
        updatedItems.splice(existingCartItem, 1);
    } else {
        const updatedItem = {
            ...updatedItems,
            quantity: existingItem.quantity - 1
        }
    }
    return {...state, items: updatedItems}
  }  
    return state;
}

export  function CartContextProvider ({children}) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items:[]});

    function addItem (item) {
        dispatchCartAction({type: 'ADD_ITEM', item: item})
    }
    function removeItem (id) {
        dispatchCartAction({type: 'REMOVE_ITEM', id: id})
       }

    const createContext = {
        items: cart.items,
        addItem: addItem,
        removeItem: removeItem,
    }

    return <CartContext.Provider value={createContext}>{children}</CartContext.Provider>
}

export default CartContext;
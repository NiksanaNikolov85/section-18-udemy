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
        if(existingCartItem > -1) {
            const existingItem = state.items[existingCartItem]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingCartItem] = updatedItem;
        } else {
            updatedItems.push({...action.item, quantity : 1})
        }
        return {...state, items: updatedItems}
    }
    if (action.type === 'REMOVE_ITEM') {
        const existingCartItem = state.items.findIndex((item) => item.id === action.id);
        const existingItem = state.items[existingCartItem];
        const updatedItems = [...state.items];
        if (existingItem.quantity === 1) {
            updatedItems.splice(existingCartItem, 1)
        } else {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1,
            }
            updatedItems[existingCartItem] = updatedItem;
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
   const cartContext = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
   }

   console.log(cartContext )

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;
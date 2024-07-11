import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            // Check if the item already exists in the cart
            const existingItemIndex = state.findIndex(item => item.id === action.id && item.size === action.size);

            if (existingItemIndex !== -1) {
                // Item already exists, update quantity and price
                let updatedState = [...state];
                updatedState[existingItemIndex] = {
                    ...updatedState[existingItemIndex],
                    qty: updatedState[existingItemIndex].qty + action.qty,
                    price: updatedState[existingItemIndex].price + action.price
                };
                return updatedState;
            } else {
                // Item does not exist, add new item to cart
                return [...state, {
                    id: action.id,
                    name: action.name,
                    qty: action.qty,
                    size: action.size,
                    price: action.price,
                    img: action.img
                }];
            }

        case "REMOVE":
            let newArr = [...state] //directly toh remove karenge nai, isliye state store kar li pehel
            //JavaScript Array splice() Method is an inbuilt method in JavaScript that is used to change the contents of an array 
            //by removing or replacing existing elements and/or adding new elements. 
            //It modifies the original array and returns an array of the removed elements.
            newArr.splice(action.index, 1)
            return newArr;
    

        case "DROP":
            // Clear the cart
            return [];

        case "UPDATE":
            // Update the quantity and price of the item
            return state.map(item => {
                if (item.id === action.id && item.size === action.size) {
                    return {
                        ...item,
                        qty: item.qty + action.qty,
                        price: item.price + action.price
                    };
                }
                return item;
            });

        default:
            console.log("Error in Reducer");
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

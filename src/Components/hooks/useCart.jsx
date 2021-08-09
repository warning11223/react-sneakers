import {useContext} from "react";
import AppContext from "../../context";


export const useCart = () => {
    const {cartItem, setCartItem} = useContext(AppContext);
    let totalPrice = cartItem.reduce((akkum, item) => Number(item.price) + akkum, 0);

    return {cartItem, totalPrice, setCartItem};
}
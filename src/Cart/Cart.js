import React from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import { CartContext } from '../Store/CartProvider';
import { useContext } from 'react';

const Cart = (props) => {

    const cartCtx = useContext(CartContext);
    const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;  // jab item ho tabhi me order button ko click kar paunga

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
      };
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, quantityOfItems: 1 });
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    quantityOfItems={item.quantityOfItems}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)} // yha ham bind ka use iss liye kar rhe hai kyonki cartItemRemoveHandler function ko koi or call kar iske andar data nhi pass kar rha hai iss liye hamne isme data ko bind kar diya hai 
                    onAdd={cartItemAddHandler.bind(null, item)}  // bind hame ek nya function return karta hai 
                />  
            ))}
        </ul>
    );  
    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onClose} className={classes['button-close']}>Close</button>
                {/* <button className={classes['button-order']}>Place Order</button> */}
                {hasItems && <button className={classes['button-order']}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart
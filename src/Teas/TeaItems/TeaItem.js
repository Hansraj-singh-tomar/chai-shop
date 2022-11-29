import React from 'react'
import classes from './TeaItem.module.css'
import TeaItemForm from './TeaItemForm';
import { CartContext } from '../../Store/CartProvider';

const TeaItem = (props) => {

  const cartCtx = React.useContext(CartContext);
  const price = `₹${props.price.toFixed(2)}`;  // points ke baad dirf two digit show karega 

  const addToCartHandler = (quantityOfItems) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      quantityOfItems: quantityOfItems,
      price: props.price,
    });
  }

  return (
    <li className={classes.tea}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
          <TeaItemForm onAddToCart={addToCartHandler}/>
        </div>
    </li>
  )
}

export default TeaItem
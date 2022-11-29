import {useContext} from 'react'
import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import { CartContext } from '../Store/CartProvider'


const HeaderCartButton = (props) => {
  
  // const {item} = useContext(CartContext);
  const cartCtx = useContext(CartContext);
  const numberOfItemInCart = cartCtx.items.reduce((currNum, item) => { return currNum + item.quantityOfItems },0);
  // console.log(numberOfItemInCart);
  return (
    <button onClick={props.onClickHeaderBtn} className={classes.button}>
        <span className={classes.icon}><CartIcon/></span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfItemInCart}</span>
    </button>
  )
}

export default HeaderCartButton



// {
//   name : "coffee",
//   amount : 10
// },
// {
//   name : "tea",
//   amount : 5
// }

// 0 + 10 = 10
// 10 + 5
// 15
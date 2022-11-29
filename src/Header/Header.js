import React from 'react'
import classes from "./Header.module.css";
import bgChaiImage from "../assets/banner.jpg"
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <>
        <header className={classes.header}>
            <h1>Chai Shop</h1>
            <HeaderCartButton onClickHeaderBtn={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={bgChaiImage} alt="Chai Shop backgroung" />
        </div>
    </>
  )
}

export default Header
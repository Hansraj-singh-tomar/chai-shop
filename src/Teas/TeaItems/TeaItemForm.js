import React, { useRef } from 'react';
import Input from '../../UI/Input';
import classes from "./TeaItemForm.module.css";

const TeaItemForm = (props) => {

  const amountInputRef = useRef();

  const [amountIsValid, setAmountIsValid] = React.useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    // console.log(amountInputRef.current.value);
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    // console.log(typeof enteredAmount.trim()); // string
    // console.log(typeof enteredAmount.trim().length); // number
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber)
  };  

  return (
    <form className={classes.form} onSubmit={submitHandler}>
        <Input 
          label="Amount" 
          input={{
            id: 'amount_' + props.id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
           defaultValue: '1',
          }}
          ref={amountInputRef}
        />
        <button>+Add</button>
        {!amountIsValid && <p>Amount should be (1-5).</p>}
    </form>
  )
}

export default TeaItemForm
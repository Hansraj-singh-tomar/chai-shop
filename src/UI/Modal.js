import React from 'react'
import classes from './Modal.module.css'
import ReactDOM  from 'react-dom';

const BackDrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onClose}></div>    
    )
};

const ModalOverlay = (props) => {
    return(
        <div className={classes.modal}>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    );
}

const modalPortalElement = document.getElementById('modal-overlays');
const Modal = (props) => {
  return (
    // <>
    //      <BackDrop onClose={props.onClose}/>
    //      <ModalOverlay>
    //          {props.children}
    //      </ModalOverlay>
    // </>
    <>
        {ReactDOM.createPortal(<BackDrop onClose={props.onClose}/>, modalPortalElement)}
        {ReactDOM.createPortal(<ModalOverlay> {props.children} </ModalOverlay>, modalPortalElement)}
    </>
  )
}

export default Modal
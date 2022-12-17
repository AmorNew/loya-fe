import React, { MouseEventHandler, ReactNode, useReducer, useRef, useState } from "react";

import styles from './Modal.module.scss';


type Props = {
    show: boolean,
    onClose: () => void,
    children: ReactNode;
}

const Modal = ({show, onClose, children}: Props) => {
    const ref = useRef(null);

    if (!show) {
        return null;
    }

    const handleClick: MouseEventHandler = (event) => {
        console.log(event);

        if (ref.current && ref.current === event.target) {
            onClose();
        }
    }

    return (
        <div ref={ref} className={styles.root} onClick={handleClick}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}

export default Modal;


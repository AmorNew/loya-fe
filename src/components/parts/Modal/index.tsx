import React, { MouseEventHandler, ReactNode, useEffect, useRef, useState } from "react";
import cn from 'classnames';

import styles from './Modal.module.scss';


type Props = {
    show: boolean,
    withParanja?: boolean,
    onClose: () => void,
    children: ReactNode;
    
}

const Modal = ({
    show, 
    withParanja = true,
    onClose, 
    children
}: Props) => {
    const ref = useRef(null);

    if (!show) {
        return null;
    }

    const handleClick: MouseEventHandler = (event) => {
        if (ref.current && ref.current === event.target) {
            onClose();
        }
    }

    return (
        <div 
            ref={ref} 
            className={cn({
                [styles.root]: true,
                [styles.paranja]: withParanja,
            })} 
            onClick={handleClick}
        >
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}

export default Modal;


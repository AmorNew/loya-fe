import React, {useState} from "react";
import cn from 'classnames';
import { ReactComponent as CarIcon } from './icons/car.svg';
import { ReactComponent as ExitIcon } from './icons/exit.svg';
import { ReactComponent as MapsIcon } from './icons/maps.svg';


import styles from './Icon.module.css';

const IconSVG = ({type}: any): any => {
    switch(type) {
        case 'car':
            return <CarIcon />;
        case 'exit':
            return <ExitIcon />;
        case 'maps':
            return <MapsIcon />;
    }
}

const Icon = ({className, type, onClick}: {className?: string, type: string, onClick?: () => void}) => {
    return (
        <i className={cn(styles.root, className, {[styles.clickable]: !!onClick})} onClick={onClick}>
           <IconSVG type={type} />
        </i>
    );
}

export default Icon;
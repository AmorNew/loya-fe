import React from "react";
import cn from 'classnames';

import { ReactComponent as CarIcon } from './icons/car.svg';
import { ReactComponent as ExitIcon } from './icons/exit.svg';
import { ReactComponent as MapsIcon } from './icons/maps.svg';
import { ReactComponent as EditIcon } from './icons/edit.svg';
import { ReactComponent as DeleteIcon } from './icons/delete.svg';
import { ReactComponent as LocationIcon } from './icons/location.svg';
import { ReactComponent as ExclamationIcon } from './icons/exclamation.svg';

import styles from './Icon.module.scss';


type Props = {
    className?: string, 
    type: string, 
    color?: 'white' | 'grey' | 'yellow',
    onClick?: () => void
};

const IconSVG = ({type}: any): any => {
    switch(type) {
        case 'car':
            return <CarIcon />;
        case 'exit':
            return <ExitIcon />;
        case 'maps':
            return <MapsIcon />;
        case 'edit':
            return <EditIcon />;
        case 'delete':
            return <DeleteIcon />;
        case 'location':
            return <LocationIcon />;
        case 'exclamation':
            return <ExclamationIcon />;
    }
}

const Icon = ({
    className, 
    type, 
    color = 'white', 
    onClick
}: Props) => {
    return (
        <i className={cn(styles.root, className, styles[color], {[styles.clickable]: !!onClick})} onClick={onClick}>
           <IconSVG type={type} />
        </i>
    );
}

export default Icon;
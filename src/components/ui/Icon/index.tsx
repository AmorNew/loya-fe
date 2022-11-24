import React from "react";
import cn from 'classnames';

import { ReactComponent as TruckIcon } from './icons/truck.svg';
import { ReactComponent as ExitIcon } from './icons/exit.svg';
import { ReactComponent as MapsIcon } from './icons/maps.svg';
import { ReactComponent as EditIcon } from './icons/edit.svg';
import { ReactComponent as DeleteIcon } from './icons/delete.svg';
import { ReactComponent as LocationIcon } from './icons/location.svg';
import { ReactComponent as ExclamationIcon } from './icons/exclamation.svg';
import { ReactComponent as CarIcon } from './icons/car.svg';
import { ReactComponent as RoadhelpIcon } from './icons/roadhelp.svg';

import styles from './Icon.module.scss';


export type IconColor = 'black' | 'breeze' | 'purple' | 'cyan' | 'green' | 'white' | 'grey' | 'yellow';

type Props = {
    className?: string, 
    type: string, 
    color?: IconColor,
    size?: 's' | 'm' | 'l', 
    onClick?: () => void
};

const IconSVG = ({type}: any): any => {
    switch(type) {
        case 'truck':
            return <TruckIcon />;
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
        case 'car':
            return <CarIcon />;
        case 'roadhelp':
            return <RoadhelpIcon />;
    }
}

const Icon = ({
    className, 
    type, 
    color = 'white',
    size = 'm', 
    onClick
}: Props) => {
    return (
        <i className={cn(
            styles.root, 
            className, 
            styles[color],
            styles[size],
            {
                [styles.clickable]: !!onClick
            }
        )} onClick={onClick}>
           <IconSVG type={type} />
        </i>
    );
}

export default Icon;
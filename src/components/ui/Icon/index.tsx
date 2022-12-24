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
import { ReactComponent as SearchIcon } from './icons/search.svg';
import { ReactComponent as FilterIcon } from './icons/filter.svg';
import { ReactComponent as SortASCIcon } from './icons/sort_ASC.svg';
import { ReactComponent as SortDESCIcon } from './icons/sort_DESC.svg';
import { ReactComponent as CrossIcon } from './icons/cross.svg';
import { ReactComponent as ArrowUpIcon } from './icons/arrow-up.svg';
import { ReactComponent as ArrowDownIcon } from './icons/arrow-down.svg';
import { ReactComponent as EngineIcon } from './icons/engine.svg';
import { ReactComponent as MileageIcon } from './icons/mileage.svg';
import { ReactComponent as TimerIcon } from './icons/timer.svg';
import { ReactComponent as TransmissionIcon } from './icons/transmission.svg';

import styles from './Icon.module.scss';


export type IconColor = 'black' | 'breeze' | 'purple' | 'cyan' | 'green' | 'white' | 'grey' | 'yellow';

type Props = {
    className?: string, 
    type: IconType, 
    color?: IconColor,
    size?: 's' | 'm' | 'l', 
    onClick?: () => void
};

export type IconType = 
    | 'truck'
    | 'exit'
    | 'maps'
    | 'edit'
    | 'delete'
    | 'location'
    | 'exclamation'
    | 'car'
    | 'roadhelp'
    | 'search'
    | 'filter'
    | 'sort'
    | 'sort'
    | 'cross'
    | 'arrow'
    | 'arrow'
    | 'engine'
    | 'mileage'
    | 'timer'
    | 'transmission'
    | 'sortASC'
    | 'sortDESC'
    | 'arrow-up'
    | 'arrow-down'
;

const IconSVG = ({type}: {type: IconType}): any => {
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
        case 'search':
            return <SearchIcon />;
        case 'filter':
            return <FilterIcon />;
        case 'sortASC':
            return <SortASCIcon />;
        case 'sortDESC':
            return <SortDESCIcon />;
        case 'cross':
            return <CrossIcon />;
        case 'arrow-up':
            return <ArrowUpIcon />;
        case 'arrow-down':
            return <ArrowDownIcon />;
        case 'engine':
            return <EngineIcon />;
        case 'mileage':
            return <MileageIcon />;
        case 'timer':
            return <TimerIcon />;
        case 'transmission':
            return <TransmissionIcon />;
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
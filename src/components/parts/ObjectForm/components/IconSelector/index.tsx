import React, { useState } from "react";
import cn from 'classnames';

import Icon, { IconColor } from "../../../../ui/Icon";

import styles from './IconSelector.module.scss';


type IconProps = {
    color: IconColor,
    background: string,
    icon: 'truck' | 'car' | 'roadhelp',
};

export const iconTypes: {[iconName: string]: IconProps} = {
    blackTruck: {
        color: 'black',
        background: '#F1F5F9',
        icon: 'truck',
    },
    
    breezeRoadhelp: {
        color: 'breeze',
        background: '#EFF6FF',
        icon: 'roadhelp',
    },
    
    purpleCar: {
        color: 'purple',
        background: '#E0E7FF',
        icon: 'car',
    },
    
    cyanTruck: {
        color: 'cyan',
        background: '#ECFEFF',
        icon: 'truck',
    },
    
    greenRoadhelp: {
        color: 'green',
        background: '#F0FDFA',
        icon: 'roadhelp',
    },
};

const IconSelector = ({value, onIconClick}: {value?: string, onIconClick: (name: string) => void}) => {

    const handleIconClick = (name: string) => {
        console.log('name', name);

        onIconClick(name);
    }

    return (
        <div className={styles.root}>
            {Object.entries(iconTypes).map(([name, iconProps]) => {
                return (
                    <div 
                        key={`${name}`} 
                        className={cn(styles.icon, {[styles.current]: value === name})} 
                        style={{background: iconProps.background}}
                        onClick={() => handleIconClick(name)}
                    >
                        <Icon type={iconProps.icon} color={iconProps.color} size='s' />
                    </div>
                );
            })}
        </div>
    );
}


export default IconSelector;
import cn from 'classnames'
import React, { useState } from 'react'

import Icon, { IconColor } from '../../../../ui/Icon'

import styles from './IconSelector.module.scss'

type IconProps = {
    color: IconColor
    background: string
    icon: 'truck' | 'car' | 'roadhelp'
}

export const iconTypes: { [iconName: string]: IconProps } = {
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
}

type Props = {
    value?: string
    error?: boolean
    onIconClick: (name: string) => void
}

const IconSelector = ({ value, error, onIconClick }: Props) => {
    const handleIconClick = (name: string) => {
        onIconClick(name)
    }

    return (
        <div
            className={cn(styles.root, {
                [styles.error]: error,
            })}
        >
            {Object.entries(iconTypes).map(([name, iconProps]) => {
                return (
                    <div
                        key={`${name}`}
                        className={cn(styles.icon, { [styles.current]: value === name })}
                        style={{ background: iconProps.background }}
                        onClick={() => handleIconClick(name)}
                    >
                        <Icon type={iconProps.icon} color={iconProps.color} size='s' />
                    </div>
                )
            })}

            {error && <span className={styles.errorText}>Выберите стиль иконки</span>}
        </div>
    )
}

export default IconSelector

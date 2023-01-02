import cn from 'classnames'
import React, { useState } from 'react'

import styles from './Button.module.scss'

type Props = {
    children: React.ReactNode
    className?: string
    buttonStyle?: 'primary' | 'secondary'
    type?: 'button' | 'submit'
    onClick?: () => void
    shrink?: boolean
}

const Button = (props: Props) => {
    const { children, className, buttonStyle = 'primary', type = 'button', shrink, onClick } = props

    return (
        <button
            className={cn(styles.root, className, styles[buttonStyle], {
                [styles.shrink]: shrink,
            })}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button

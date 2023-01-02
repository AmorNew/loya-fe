import cn from 'classnames'
import React, { useState } from 'react'
import { MaskedInput } from 'react-hook-mask'

import styles from './Input.module.scss'

interface Props {
    onChange: (value: string) => void
    labelText: string
    className?: string
    size: 's' | 'l'
    error?: string
}

const getInputComponent = (props: any) => (props.type === 'hidden' ? (props: any) => <input {...props} /> : MaskedInput)

const Input = (props: any) => {
    const [value, setValue] = useState<string>(props.defaultValue || '')

    const InputComponent = getInputComponent(props)

    const {
        onChange,
        onFocus,
        onBlur,
        labelText,
        className,
        disabled = false,
        size = 'l',
        error,
        errorText,
        defaultValue,
        maskGenerator,
        ...restProps
    } = props

    const aditionalProps: { maskGenerator?: any } = {}

    if (props.type !== 'hidden') {
        aditionalProps.maskGenerator = maskGenerator
    }

    return (
        <label
            className={cn(className, styles.label, [styles[size]], {
                [styles.disabled]: disabled,
                [styles.error]: error,
                [styles.hidden]: Boolean(props.type === 'hidden'),
            })}
        >
            <InputComponent
                onBlur={(e) => {
                    onBlur && onBlur(e)
                }}
                onFocus={(e) => {
                    onFocus && onFocus(e)
                }}
                onChange={(val) => {
                    onChange && onChange(val)
                    setValue(val)
                }}
                className={styles.input}
                disabled={disabled}
                {...restProps}
                value={value}
                {...aditionalProps}
            />

            <p className={styles.labelText}>{labelText}</p>

            {error && errorText && <span className={styles.errorText}>{errorText}</span>}
        </label>
    )
}

export default Input

import React, {useState} from "react";
import cn from 'classnames';

import styles from './Input.module.scss';

type Props = {
    onChange: (value: string) => void;
    labelText: string;
    className?: string;
    size: "s" | "l";
    error?: string;
};

const Input = (props: any) => {
    const [focus, setFocus] = useState<boolean>(false);
    const [empty, setEmpty] = useState<boolean>(!props.value?.length);

    const {
        onChange, 
        labelText, 
        className, 
        disabled = false, 
        size = 'l',
        error, 
        ...restProps
    } = props;

    return (
        <label className={cn(styles.label, className, [styles[size]], {
            [styles.focus]: focus, 
            [styles.empty]: empty, 
            [styles.disabled]: disabled,
            [styles.error]: error,
            [styles.hidden]: Boolean(props.type === 'hidden')
        })}>
            <p className={styles.labelText}>{labelText}</p>
            <input
                onFocus={e => {setFocus(true);}}
                onBlur={e => {setFocus(false);}}
                onChange={e => {onChange(e.target.value, e); setEmpty(Boolean(!e.target.value.length))}}
                className={styles.input}
                disabled={disabled}
                {...restProps} 
            />
        </label>
    );
}

export default Input;
import React, {useState} from "react";
import cn from 'classnames';
import { MaskedInput, DEFAULT_MASK_RULES, createDefaultMaskGenerator, MaskGenerator } from 'react-hook-mask';

import styles from './Input.module.scss';

type Props = {
    onChange: (value: string) => void;
    labelText: string;
    className?: string;
    size: "s" | "l";
    error?: string;
};

// const maskGenerator = createDefaultMaskGenerator('999 999 9999');

const getInputComponent = (props: any) => props.type === 'hidden' ? (props: any) => (<input {...props} />) : MaskedInput;

const Input = (props: any) => {
    const [focus, setFocus] = useState<boolean>(false);
    const [empty, setEmpty] = useState<boolean>(!props.defaultValue?.length);
    const [value, setValue] = useState<string>(props.defaultValue || '');

    const InputComponent = getInputComponent(props);

    const {
        onChange, 
        onFocus,
        onBlur,
        labelText, 
        className, 
        disabled = false, 
        size = 'l',
        error, 
        defaultValue,
        // type,
        maskGenerator,
        ...restProps
    } = props;

    const aditionalProps: {maskGenerator?: any} = {};

    if (props.type !== 'hidden') {
        aditionalProps.maskGenerator = maskGenerator;
    }

    return (
        <label className={cn(
            className, 
            styles.label, 
            [styles[size]], 
            {
                // [styles.focus]: focus, 
                // [styles.empty]: empty, 
                [styles.disabled]: disabled,
                [styles.error]: error,
                [styles.hidden]: Boolean(props.type === 'hidden')
            }
        )}>
            <InputComponent
                // maskGenerator={props.type === 'hidden' ? undefined : maskGenerator}
                // onFocus={e => {
                //     console.log('---');
                //     console.log('onFocus');
                //     console.log('e.target.selectionStart', e.target.selectionStart);
                //     console.log('e.target.selectionEnd', e.target.selectionEnd);

                //     // onFocus && onFocus(e);
                //     //  setFocus(true);
                // }}
                onBlur={e => {
                    console.log('---');
                    console.log('onBlur');
                    console.log('e.target.selectionStart', e.target.selectionStart);
                    console.log('e.target.selectionEnd', e.target.selectionEnd);
                    
                    

                    // onBlur && onBlur(e); 
                    // setFocus(false);
                    // console.log(e.target);
                    // setValue(e.target.value);
                }}

                // onFocus={(e) => {
                //     console.log('-----');
                //     console.log('focus!');
                //     if (e.currentTarget === e.target) {
                //       console.log('focused self');
                //     //   setFocus(true);
                //     } else {
                //       console.log('focused child', e.target);
                //     //   setFocus(true);
                //     }
                //     if (!e.currentTarget.contains(e.relatedTarget)) {
                //       // Not triggered when swapping focus between children
                //       console.log('focus entered self');
                //     //   setFocus(true);
                //     }
                //   }}
                // onBlur={(e) => {
                //     console.log('-----');
                //     console.log('blur!');
                //     console.log(e);
                    

                //     if (e.currentTarget === e.target) {
                //         console.log('unfocused self');
                //         // setFocus(false);
                //     } else {
                //         console.log('unfocused child', e.target);
                //         // setFocus(false);
                //     }
                //     if (!e.currentTarget.contains(e.relatedTarget)) {
                //         // Not triggered when swapping focus between children
                //         console.log('focus left self');
                //         // setFocus(false);
                //     }
                // }}

                onChange={val => {
                    // onChange && onChange(value.target.value, value); 
                    // setEmpty(Boolean(!value.length));
                    // setValue(value);
                    onChange && onChange(val);
                    setValue(val);
                }}
                className={styles.input}
                disabled={disabled}
                {...restProps} 
                // type={type === 'hidden' ? undefined : type}
                value={value}
                {...aditionalProps}
            />

            <p className={styles.labelText}>{labelText}</p>
        </label>
    );
}

export default Input;
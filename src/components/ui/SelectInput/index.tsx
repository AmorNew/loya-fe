import React, {useEffect, useState} from "react";
import cn from 'classnames';

import Icon from "../Icon";
import Input from "../Input";

import styles from './SelectInput.module.scss';


const options = [
    {text: 'пункт 1', value: '1'},
    {text: 'пункт 2', value: '2'},
    {text: 'пункт 3', value: '3'},
    {text: 'пункт 4', value: '4'},
    {text: 'пункт 5', value: '5'},
];

type Props = {
    onChange: (value: string) => void;
    labelText: string;
    className?: string;
    size: "s" | "l";
    error?: string;
};

const SelectInput = (props: any) => {
    const [focus, setFocus] = useState<boolean>(false);
    const [empty, setEmpty] = useState<boolean>(!props.value?.length);

    const [show, setShow] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');

    const {
        onChange, 
        labelText, 
        className, 
        disabled = false, 
        size = 's',
        error, 
        ...restProps
    } = props;

    const onBlur = () => {
        setValue('text')
        // console.log('blur');
        setShow(false);
    }; 

    const onFocus= () => {
        // console.log('focus');
        setShow(true);
    }

    return (
        <div className={styles.root}>
            <div className={styles.inputWrapper}>
                <Input 
                    className={styles.input} 
                    onBlur={onBlur} 
                    onFocus={onFocus} 
                    size={size} 
                    // value={value}
                    // onChange={(val: any) => {setValue(val)}}
                >
                    
                </Input>
                <Icon className={styles.icon} type={`arrow-${show ? 'up' : 'down'}`} color="grey" />
            </div>

            <div className={cn(styles.selectorWrapper, {[styles.show]: show})}>
                {options.map(({value, text}, idx) => {
                    return (
                        <div key={idx} className={styles.option} onClick={() => {console.log('click'); setValue(text)}}>
                            {text}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SelectInput;
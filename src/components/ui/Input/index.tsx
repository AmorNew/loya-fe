import React, {useState} from "react";
import cn from 'classnames';

import './styles.css';

const Input = (props: any) => {
    const [focus, setFocus] = useState<boolean>(false);
    const [empty, setEmpty] = useState<boolean>(!props.value?.length);

    const {onChange, labelText, ...restProps} = props;

    return (
        <label className={cn('label', {focus: focus || !empty, hidden: Boolean(props.type === 'hidden')})}>
            <p className="labelText">{labelText}</p>
            <input
                onFocus={e => {setFocus(true);}}
                onBlur={e => {setFocus(false);}}
                onChange={e => {onChange(e.target.value, e); setEmpty(Boolean(!e.target.value.length))}}
                className="input"
                {...restProps} 
            />
        </label>
    );
}

export default Input;
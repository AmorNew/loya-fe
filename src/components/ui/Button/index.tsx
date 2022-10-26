import React, {useState} from "react";
import cn from 'classnames';

import './styles.css';

const Button = (props: any) => {
    const {children, className, ...restProps} = props;

    return (
        <button className={cn("button", className)} {...restProps}>
            {children}
        </button>
    );
}

export default Button;
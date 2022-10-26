import React, {useState} from "react";
import cn from 'classnames';

import Logo from "../../ui/Logo";

import './styles.css';


const SideBar = ({className}: any) => {
    return (
        <div className="side-bar">
            <Logo />
        </div>
    );
}

export default SideBar;
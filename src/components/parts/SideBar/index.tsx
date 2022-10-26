import React, {useState} from "react";
import cn from 'classnames';

import ory from "../../../pkg/sdk"

import Logo from "../../ui/Logo";

import styles from './SideBar.module.css';
import Icon from "../../ui/Icon";
import { useLocation, useNavigate } from "react-router-dom";


const SideBar = ({className, navigate}: any) => {
    const location = useLocation();

    const currentLocation = location.pathname.replace('/', '');

    const onLogoutClick = () => {
        console.log('exit'); 
        
        ory
            .createSelfServiceLogoutFlowUrlForBrowsers()
            .then(({data}) => {
                const {logout_token} = data;

                return ory.submitSelfServiceLogoutFlow(logout_token);
            })
            .then(() => {
                navigate('/login');
            });
    }

    return (
        <div className={styles.root}>
            <Logo />
            <div className={styles.iconsWrapper}>
                <div className={cn(styles.button, {[styles.current]: currentLocation === '' || currentLocation === 'map'})} onClick={() => {navigate('/map');}} >
                    <Icon type={'maps'} />
                </div>
                <div className={cn(styles.button, {[styles.current]: currentLocation === 'object'})} onClick={() => {navigate('/object');}} >
                    <Icon type={'car'} />
                </div>

                <div className={cn(styles.filler)} />
                
                <div className={cn(styles.button)} onClick={onLogoutClick}>
                    <Icon type={'exit'} />
                </div>
            </div>
        </div>
    );
}

export default SideBar;
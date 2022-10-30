import React, {useState, useEffect} from "react";
import cn from 'classnames';

import ory from "../../../pkg/sdk"

import Logo from "../../ui/Logo";

import styles from './SideBar.module.css';
import Icon from "../../ui/Icon";
import { useLocation, useNavigate, useRoutes, useResolvedPath } from "react-router-dom";
 

const SideBar = ({className}: any) => {
    const location = useLocation();
    const navigate = useNavigate();

    const currentLocation = location.pathname.split('/')[1];
    const currentObjectId = location.pathname.split('/')[2];
    
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
                <div className={cn(styles.button, {[styles.current]: currentLocation === '' || currentLocation === 'map'})} onClick={() => {
                    
                    if (currentLocation === 'map' && currentObjectId) {
                        navigate('/map/');
                    } else {
                        navigate(`/map/${currentObjectId || ''}`);
                    }
                    
                }} >
                    <Icon type={'maps'} />
                </div>
                <div className={cn(styles.button, {[styles.current]: currentLocation === 'object'})} onClick={() => {
                
                    if (currentLocation === 'object' && currentObjectId) {
                        navigate('/object/');
                    } else {
                        navigate(`/object/${currentObjectId || ''}`);
                    }
                    
                }} >
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
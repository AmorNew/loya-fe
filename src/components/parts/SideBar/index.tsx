import cn from 'classnames'
import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import ory from '../../../pkg/sdk'

import Icon from '../../ui/Icon'
import Logo from '../../ui/Logo'

import styles from './SideBar.module.css'

const SideBar = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const currentLocation = location.pathname.split('/')[1]
    const currentObjectId = location.pathname.split('/')[2]

    const onLogoutClick = () => {
        ory.createSelfServiceLogoutFlowUrlForBrowsers()
            .then(({ data }) => {
                const { logout_token } = data

                return ory.submitSelfServiceLogoutFlow(logout_token)
            })
            .then(() => {
                navigate('/login')
            })
    }

    return (
        <div className={styles.root}>
            <Logo />
            <div className={styles.iconsWrapper}>
                <div
                    className={cn(styles.button, {
                        [styles.current]: currentLocation === '' || currentLocation === 'map',
                    })}
                    onClick={() => {
                        if (currentLocation === 'map' && currentObjectId) {
                            navigate('/map')
                        } else {
                            navigate(`/map/${currentObjectId === 'new' ? '' : currentObjectId || ''}`)
                        }
                    }}
                >
                    <Icon type={'maps'} />
                </div>
                <div
                    className={cn(styles.button, {
                        [styles.current]: currentLocation === 'object',
                    })}
                    onClick={() => {
                        if (currentLocation === 'object' && currentObjectId) {
                            navigate('/object')
                        } else {
                            navigate(`/object/${currentObjectId || ''}`)
                        }
                    }}
                >
                    <Icon type={'truck'} />
                </div>

                <div className={cn(styles.filler)} />

                <div className={cn(styles.button)} onClick={onLogoutClick}>
                    <Icon type={'exit'} />
                </div>
            </div>
        </div>
    )
}

export default SideBar

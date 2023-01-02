import cn from 'classnames'
import moment from 'moment'
import React from 'react'
import 'moment/locale/ru'

import { Event as EventType } from '../../../../../../../app/api/loyaBackendAPI'

import Icon from '../../../../../../ui/Icon'

import styles from './Event.module.scss'

type Props = {
    event: EventType
}

const CATEGORY_PROPS: any = {
    settings: {
        icon: {
            type: 'edit',
            className: 'settings',
        },
        header: 'Изменение настроек',
    },
}

const Event = ({ event }: Props) => {
    const { created_at, category, severity } = event

    const time = moment(created_at).format('HH:mm')

    let description

    try {
        description = JSON.parse(event.description)
    } catch (e) {
        console.error(e)
    }

    return (
        <div className={cn(styles.root)}>
            <div className={styles.icon}>
                <Icon
                    type={CATEGORY_PROPS[category]?.icon.type}
                    className={styles[CATEGORY_PROPS[category]?.icon.className]}
                />
            </div>

            <div className={styles.description}>
                <div className={styles.descriptionHeader}>{CATEGORY_PROPS[category]?.header}</div>

                <div className={styles.descriptionText}>{description && description.Data}</div>
            </div>

            <div className={styles.time}>{time}</div>
        </div>
    )
}

export default Event

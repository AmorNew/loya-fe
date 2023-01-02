import cn from 'classnames'
import moment from 'moment'
import React from 'react'

import { Event as EventType } from '../../../../../../../app/api/loyaBackendAPI'

import Event from '../Event'

import styles from './HistoryList.module.scss'

type Props = {
    history: EventType[]
}

const HistoryList = ({ history }: Props) => {
    let prevDateDay: number

    const elements: any = []

    history.forEach((event: EventType, index: number) => {
        const { created_at } = event
        const DateDay = Number(moment(created_at).format('DD'))

        if (!prevDateDay) {
            prevDateDay = DateDay
        }

        if (prevDateDay !== DateDay || index === 0) {
            prevDateDay = DateDay

            elements.push(
                <div key={`date-${DateDay}`} className={styles.dateDay}>
                    {moment(created_at).format('DD MMMM')}
                </div>,
            )
        }

        console.log(DateDay)

        elements.push(<Event key={event.created_at} event={event} />)
    })

    return <div className={cn(styles.root)}>{elements}</div>
}

export default HistoryList

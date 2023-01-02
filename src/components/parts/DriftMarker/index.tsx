import cn from 'classnames'
import L from 'leaflet'
import { LatLngExpression } from 'leaflet'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import ReactLeafletDriftMarker from 'react-leaflet-drift-marker'

import { useAppSelector } from '../../../app/hooks'
import { UnitId } from '../../../app/reducers/collectionsReducer'

import { isPointOnline, selectPointByObjectId } from '../../../app/reducers/pointsReducer'
import Icon, { IconColor, IconType } from '../../ui/Icon'
import { iconTypes } from '../ObjectForm/components/IconSelector'

import styles from './DriftMarker.module.scss'

const CustomMarker = ({
    iconType,
    color,
    name,
    course,
    speed,
    isOnline,
}: {
    iconType: IconType
    color: IconColor
    name: string
    course: number
    speed: number
    isOnline: boolean
}) => (
    <div
        className={cn(styles.root, { [styles.faded]: !isOnline })}
        style={{
            transform: isOnline && speed > 0 ? `rotate(${course}deg)` : 'rotate(180deg)',
        }}
    >
        <div
            className={cn(styles.circle, styles[color], {
                [styles.dynamic]: isOnline && !!speed,
            })}
            style={{
                transform: isOnline && speed > 0 ? `rotate(-${course}deg)` : 'rotate(-180deg)',
            }}
        >
            <Icon type={iconType} size='s' />

            {isOnline && !speed && <div className={styles.parked}>P</div>}
            {!isOnline && <div className={styles.offline} />}

            <div
                className={styles.name}
                style={{
                    top: isOnline && speed > 0 ? `${-27 - 8 * Math.cos(course * (Math.PI / 180))}px` : '-25px',
                }}
            >
                {name}
            </div>
        </div>

        <div className={cn(styles.triangle, styles[color])} />
    </div>
)

const DriftMarker = ({
    objectId,
    hwId,
    iconName,
    name,
    onClick,
}: {
    objectId: UnitId
    hwId: number
    iconName: string
    name: string
    onClick: (objectId: UnitId, position: LatLngExpression) => void
}) => {
    const point = useAppSelector((state) => selectPointByObjectId(state, hwId))

    if (!point) {
        return null
    }

    const { latitude, longitude, course, speed } = point

    const isOnline = isPointOnline(point)

    const position: LatLngExpression = {
        lat: latitude,
        lng: longitude,
    }

    const iconProps = iconTypes[iconName] || {}

    const divIcon = new L.DivIcon({
        html: ReactDOMServer.renderToString(
            <CustomMarker
                iconType={iconProps.icon}
                color={iconProps.color}
                name={name}
                course={course}
                speed={speed}
                isOnline={isOnline}
            />,
        ),
        className: styles.divIcon,
        iconSize: [1, 1],
    })

    return (
        <ReactLeafletDriftMarker
            position={position}
            duration={1000}
            eventHandlers={{ click: () => onClick(objectId, position) }}
            icon={divIcon}
        />
    )
}

export default DriftMarker

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactLeafletDriftMarker from "react-leaflet-drift-marker"
import L from 'leaflet';
import cn from 'classnames';

import { UnitId } from '../../../app/reducers/collectionsReducer';
import { useAppSelector } from '../../../app/hooks';
import { LatLngExpression } from 'leaflet';
import { selectPointByObjectId } from '../../../app/reducers/pointsReducer';
import Icon, { IconColor } from '../../ui/Icon';
import { ReactComponent as MarkerIcon } from './marker.svg';

import styles from './DriftMarker.module.scss'
import { iconTypes } from '../ObjectForm/components/IconSelector';


const CustomMarker = ({
    iconType, 
    color, 
    name,
    course,
    speed,
}: {
    iconType: string, 
    color: IconColor, 
    name: string,
    course: number,
    speed: number,
}) => (
    <div className={styles.root} style={{ transform: speed > 0 ? `rotate(${course}deg)` : '' }}>
        <div 
            className={cn(styles.circle, styles[color], {[styles.dynamic]: !!speed})} 
            style={{ transform: speed > 0 ? `rotate(${360 - course}deg)` : '' }}
        >
            <Icon type={iconType} size='s' />

            {!speed && <div className={styles.parked}>P</div>}

            <div className={styles.name} style={{top: `-${30 - 5 * Math.cos(course * (Math.PI / 180))}px`}}>
                {name}
            </div>
        </div>

        <div className={cn(styles.triangle, styles[color])} />
    </div>
)

const DriftMarker = (
    {objectId, hwId, iconName, name, onClick}: 
    {objectId: UnitId, hwId: number, iconName: string, name: string, onClick: (objectId: UnitId, position: LatLngExpression) => void}
) => {
    const point = useAppSelector(state => selectPointByObjectId(state, hwId));

    if (!point) {
        return null;
    }

    const {latitude, longitude, course, speed} = point;

    const position: LatLngExpression = {
        lat: latitude,
        lng: longitude,
    }

    const iconProps = iconTypes[iconName] || {};
    
    const divIcon = new L.DivIcon({
        html: ReactDOMServer.renderToString(<CustomMarker 
            iconType={iconProps.icon} 
            color={iconProps.color} 
            name={name} 
            course={course + 180}
            speed={speed}
        />),
        className: styles.divIcon,
        iconSize: [1, 1],
    });

    return (
        <ReactLeafletDriftMarker 
            position={position} 
            duration={1000}
            eventHandlers={{click: () => onClick(objectId, position)}}
            icon={divIcon}
        />
    )
} 

export default DriftMarker;
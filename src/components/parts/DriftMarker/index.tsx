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


const CustomMarker = ({iconType, color, name}: {iconType: string, color: IconColor, name: string}) => (
    <div className={styles.root}>
        <div className={styles.name}>{name}</div>
        <i className={cn(styles.iconWrapper, styles[color])}>
            <MarkerIcon />
        </i>
        <Icon type={iconType} size='s' />
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

    const {latitude, longitude} = point;

    const position: LatLngExpression = {
        lat: latitude,
        lng: longitude,
    }

    const iconProps = iconTypes[iconName] || {};
    
    const divIcon = new L.DivIcon({
        html: ReactDOMServer.renderToString(<CustomMarker iconType={iconProps.icon} color={iconProps.color} name={name} />),
        className: 'loya-div-icon',
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
import React from 'react';
import ReactLeafletDriftMarker from "react-leaflet-drift-marker"

import { UnitId } from '../../../app/reducers/collectionsReducer';
import { useAppSelector } from '../../../app/hooks';
import { LatLngExpression } from 'leaflet';
import { selectPointByObjectId } from '../../../app/reducers/pointsReducer';


const DriftMarker = (
    {objectId, hwId, onClick}: 
    {objectId: UnitId, hwId: number, onClick: (objectId: UnitId, position: LatLngExpression) => void}
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

    return (
        <ReactLeafletDriftMarker 
            position={position} 
            duration={1000}
            eventHandlers={{click: () => onClick(objectId, position)}}
        />
    )
} 

export default DriftMarker;
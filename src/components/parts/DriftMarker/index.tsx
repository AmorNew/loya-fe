import React from 'react';
import ReactLeafletDriftMarker from "react-leaflet-drift-marker"

import { selectObjectById, UnitId } from '../../../app/reducers/collectionsReducer';
import { useAppSelector } from '../../../app/hooks';
import { LatLngExpression } from 'leaflet';


const DriftMarker = (
    {objectId, onClick}: 
    {objectId: UnitId, onClick: (objectId: UnitId, position: LatLngExpression) => void}
) => {
    const object = useAppSelector(state => selectObjectById(state, objectId));

    if (!object) {
        return null;
    }

    const {position} = object;

    return (
        <ReactLeafletDriftMarker 
            position={object.position} 
            duration={1000}
            eventHandlers={{click: () => onClick(objectId, position)}}
        />
    )
} 

export default DriftMarker;
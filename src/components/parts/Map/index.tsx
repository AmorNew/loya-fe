import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet'
import { Map as LeafletMap } from 'leaflet';

import { useAppSelector } from '../../../app/hooks';
import { Unit, UnitId } from '../../../app/reducers/collectionsReducer';
import { selectCurrentObjectId } from '../../../app/reducers/dataReducer';
import DriftMarker from '../DriftMarker';

import { selectAllUnits, selectUnitById } from '../../../app/api/loyaBackendAPI';
import { selectPointByObjectId, selectPointsBounds } from '../../../app/reducers/pointsReducer';

import styles from './Map.module.scss';


export default function Map() {
  const [map, setMap] = useState<LeafletMap | null>(null);

  const navigate = useNavigate();

  const currentObjects = useAppSelector(selectAllUnits);

  const currentObjectId = useAppSelector(selectCurrentObjectId);
  const currentObject = useAppSelector(state => selectUnitById(state, currentObjectId));
  const currentObjectPoint = useAppSelector(state => selectPointByObjectId(state, currentObject?.device?.hw_id))

  const bounds = useAppSelector(selectPointsBounds);

  useEffect(() => {
    if (map) {
      if (currentObjectPoint) {
        // map.setView([currentObjectPoint.latitude, currentObjectPoint.longitude], map.getZoom(), { animate: true, duration: 1 });
        setTimeout(() => {map.invalidateSize(); }, 0);
        // setTimeout(() => {map.invalidateSize(true); }, 300);
      } else {

        // map.setView([55.7522, 37.6156], map.getZoom());
        // console.log('bounds', bounds);
        // if (bounds.length) {
        //   map.fitBounds(bounds);
        // }
        setTimeout(() => {map.invalidateSize(); }, 0);
        // setTimeout(() => {map.invalidateSize(true); }, 300);
      }
    }
  }, [currentObjectId, currentObjectPoint, map, bounds]);

  const setCurrent = (objectId: UnitId) => {
    if (currentObjectId === objectId) {
      navigate(`.`) 
    } else {
      navigate(`./${objectId}`)
    }
  }

  return(
    <div className={styles.map}>
        <MapContainer 
            center={[55.7522, 37.6156]}
            zoom={6}
            scrollWheelZoom={true}
            style={{ height: "100vh" }}
            zoomControl={true}
            ref={setMap}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            {currentObjects 
            && currentObjects.map(({id, device: {hw_id}}: Unit) => {
                if (currentObjectId && currentObjectId !== id) {
                    return null;
                }

                return (
                    <DriftMarker 
                        key={`${id}_${hw_id}`} 
                        objectId={id}
                        hwId={Number(hw_id)}
                        onClick={setCurrent}
                    />
                )
            })}
        </MapContainer>
    </div>
  );
}
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, useMapEvents, useMap } from 'react-leaflet'
import { LatLngExpression, Map as LeafletMap } from 'leaflet';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Unit, UnitId } from '../../../app/reducers/collectionsReducer';
import { selectCurrentObjectId, selectSearchParams, setSearchParams } from '../../../app/reducers/dataReducer';
import DriftMarker from '../DriftMarker';

import { selectAllUnits, selectUnitById } from '../../../app/api/loyaBackendAPI';
import { selectPointByObjectId, selectPointsBounds } from '../../../app/reducers/pointsReducer';

import styles from './Map.module.scss';


function MapActions() {
  const dispatch = useAppDispatch();

  const currentObjectId = useAppSelector(selectCurrentObjectId);
  const currentObject = useAppSelector(state => selectUnitById(state, currentObjectId));
  const currentObjectPoint = useAppSelector(state => selectPointByObjectId(state, currentObject?.device?.hw_id))
  
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      const bounds = map.getBounds();
      const zoom = map.getZoom();

      const northWest = bounds.getNorthWest();
      const southEast = bounds.getSouthEast();

      const box = {
        left_top: {
          lat: northWest.lat,
          lon: northWest.lng,
        },
        right_bottom: {
          lat: southEast.lat,
          lon: southEast.lng,
        },
      };

      if (!currentObjectPoint){
        dispatch(setSearchParams({box}));

        localStorage.setItem('center', JSON.stringify(center));
        localStorage.setItem('zoom', JSON.stringify(zoom));
        localStorage.setItem('box', JSON.stringify(box))
      }
    },
  });

  return null
};

export default function Map() {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const [center] = useState<LatLngExpression | undefined>(JSON.parse(localStorage.getItem('center') || '[55.7522, 37.6156]'));
  const [zoom] = useState<number>(Number(JSON.parse(localStorage.getItem('zoom') || '6')));

  const navigate = useNavigate();

  const currentObjects = useAppSelector(selectAllUnits);

  const currentObjectId = useAppSelector(selectCurrentObjectId);
  const currentObject = useAppSelector(state => selectUnitById(state, currentObjectId));
  const currentObjectPoint = useAppSelector(state => selectPointByObjectId(state, currentObject?.device?.hw_id))

  const bounds = useAppSelector(selectPointsBounds);

  useEffect(() => {
    if (map) {
      if (currentObjectPoint) {

        map.setView([currentObjectPoint.latitude, currentObjectPoint.longitude], map.getZoom());
        // setTimeout(() => {map.invalidateSize(); }, 0);
        setTimeout(() => {map.invalidateSize(true); }, 300);
      } else {
        // map.setView([55.7522, 37.6156], map.getZoom());
        // console.log('bounds', bounds);
        // if (bounds.length) {
        //   map.fitBounds(bounds);
        // }
        // setTimeout(() => {map.invalidateSize(); }, 0);
        setTimeout(() => {map.invalidateSize(true); }, 300);
      }
    }
  }, [currentObjectId, currentObjectPoint, map, bounds]);

  const setCurrent = (objectId: UnitId) => {
    if (currentObjectId === objectId) {
      
      navigate(`.`);
    } else {
      
      navigate(`./${objectId}`);
    }
  }

  return(
    <div className={styles.map}>
        <MapContainer 
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            style={{ height: "100vh" }}
            zoomControl={true}
            ref={setMap}
            
        >
          <MapActions />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {currentObjects 
          && currentObjects.map(({id, icon, visible_name, device: {hw_id}}: Unit) => {
              if (currentObjectId && currentObjectId !== id) {
                  return null;
              }

              return (
                  <DriftMarker 
                      key={`${id}_${hw_id}`} 
                      objectId={id}
                      hwId={Number(hw_id)}
                      iconName={icon}
                      name={visible_name}
                      onClick={setCurrent}
                  />
              )
          })}
        </MapContainer>
    </div>
  );
}
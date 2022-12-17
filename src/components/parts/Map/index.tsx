import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, useMapEvents, useMap } from 'react-leaflet'
import { LatLngExpression } from 'leaflet';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Unit as UnitCollection, UnitId } from '../../../app/reducers/collectionsReducer';
import { selectCurrentObjectId, setSearchParams } from '../../../app/reducers/dataReducer';
import DriftMarker from '../DriftMarker';

import { selectAllUnits, selectUnitById } from '../../../app/api/loyaBackendAPI';
import { selectPointByObjectId } from '../../../app/reducers/pointsReducer';
import { PositionClient } from '../../../schema/PositionServiceClientPb';
import { Point, Unit } from '../../../schema/position_pb';
import { Unit as UnitModel } from '../../../app/reducers/collectionsReducer';
import { setPoint } from '../../../app/reducers/pointsReducer';

import styles from './Map.module.scss';


const MapActions = () => {
  const dispatch = useAppDispatch();

  const currentObjectId = useAppSelector(selectCurrentObjectId);
  const currentObject = useAppSelector(state => selectUnitById(state, currentObjectId));
  const currentObjectPoint = useAppSelector(state => selectPointByObjectId(state, currentObject?.device?.hw_id))

  let timerId: any;

  const map = useMapEvents({
    moveend: () => {
      if (timerId) {
        clearTimeout(timerId);
      }

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

      if (!currentObjectPoint) {
        timerId = setTimeout(() => {
          dispatch(setSearchParams({box}));
        }, 1500);
      }

      localStorage.setItem('center', JSON.stringify(center));
      localStorage.setItem('zoom', JSON.stringify(zoom));
      localStorage.setItem('box', JSON.stringify(box));
    },
  });

  useEffect(() => {
    const boxString = localStorage.getItem('box');
    const box = boxString ? JSON.parse(boxString) : undefined;

    dispatch(setSearchParams({box}));

    return () => {
      dispatch(setSearchParams({box: null}));
    }
  });

  return null
};

const Markers = () => {
  const map = useMap();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentObjects = useAppSelector(selectAllUnits);

  const currentObjectId = useAppSelector(selectCurrentObjectId);
  const currentObject = useAppSelector(state => selectUnitById(state, currentObjectId));
  const currentObjectPoint = useAppSelector(state => selectPointByObjectId(state, currentObject?.device?.hw_id))

  useEffect(() => {
      let stream: any = undefined;
      
      const client = new PositionClient(process.env.REACT_APP_GRPC || '');
      
      if (currentObjectId) {
        const currentObject = currentObjects.find(({id}: UnitModel) => id === currentObjectId);
        
        if (currentObject) {
          const request = new Unit();

          request.setObjectIdsList([currentObject.device.hw_id]);    
          
          stream = client.streaming(request);

          stream.on('data', (point: Point) => {
            dispatch(setPoint(point.toObject()));

            // console.log('-----------------------');
            // console.log('point', point.toObject());
          });
        }

      } else if (currentObjects) {
        const request = new Unit();
        request.setObjectIdsList(currentObjects.map(({device: {hw_id}}: any) => hw_id));    
        
        stream = client.streaming(request);

        stream.on('data', (point: Point) => {
          dispatch(setPoint(point.toObject()));

          // console.log('-----------------------');
          // console.log('point', point.toObject());
        });
      }

    return () => {
      stream && stream.cancel();
    };
  }, [dispatch, currentObjectId, currentObjects]);

  useEffect(() => {
    if (map) {
      if (currentObjectPoint) {
        map.setView([currentObjectPoint.latitude, currentObjectPoint.longitude], map.getZoom());
      }

      setTimeout(() => {map.invalidateSize(true); }, 300);
    }
  }, [currentObjectId, currentObjectPoint, map]);

  const setCurrent = (objectId: UnitId) => {
    if (currentObjectId === objectId) {
      
      navigate(`.`);
    } else {
      
      navigate(`./${objectId}`);
    }
  }

  if (!currentObjects) {
    return null
  }

  return (
    <>
      {currentObjects.map(({id, icon, visible_name, device: {hw_id}}: UnitCollection) => {
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
    </>
  );
}

export default function Map() {
  const [center] = useState<LatLngExpression | undefined>(JSON.parse(localStorage.getItem('center') || '[55.7522, 37.6156]'));
  const [zoom] = useState<number>(Number(JSON.parse(localStorage.getItem('zoom') || '6')));

  return(
    <div className={styles.map}>
        <MapContainer 
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            style={{ height: "100vh" }}
            zoomControl={true}   
        >
          <MapActions />

          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          <Markers />
        </MapContainer>
    </div>
  );
}
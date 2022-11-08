import React, {useEffect, useState, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet'

import SideBar from '../../components/parts/SideBar';
import ObjectList from '../../components/parts/ObjectList';
import Object from '../../components/parts/Object';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectObjectById, UnitId, updateUnitPosition } from '../../app/reducers/collectionsReducer';
import { selectCurrentObjectId, selectCurrentObjectsIds } from '../../app/reducers/dataReducer';
import DriftMarker from '../../components/parts/DriftMarker';
import { LatLngExpression } from 'leaflet';

import './styles.css';
import { UnitCoordsClient } from '../../schema/Unit_coordsServiceClientPb';
import { Point, Unit } from '../../schema/unit_coords_pb';
import { start } from 'repl';


export default function MapPage() {
  const [map, setMap] = useState<any>(null);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const currentObjectsIds = useAppSelector(selectCurrentObjectsIds);
  const currentObjectId = useAppSelector(selectCurrentObjectId);
  // const currentObject = useAppSelector(state => selectObjectById(state, currentObjectId));

  // useEffect( () => {
  //   console.log("mount")
  
  //   const client = new UnitCoordsClient(process.env.REACT_APP_GRPC || '');
    
  //   currentObjectsIds && currentObjectsIds.forEach(objectId => {
  //     const request = new Unit();
  //     request.setObjectId(objectId);    
      
  //     const stream = client.coords(request, {});
      
  //     streams.push(stream);

  //     stream.on('data', (r: Point) => {
  //       const {objectId, latitude, longitude}: Point.AsObject = r.toObject();
        
  //       console.log(objectId, latitude, longitude);
  //       // console.log(`object-${objectId}`);

  //       // setState((prevState: any) => ({
  //       //   ...prevState,
  //       //   collections: {
  //       //     ...prevState.collections,
  //       //     objects: {
  //       //       ...prevState.collections.objects,
  //       //       [`object-${objectId}`]: {
  //       //         ...prevState.collections.objects[`object-${objectId}`],
  //       //         position: {
  //       //           lat: latitude,
  //       //           lng: longitude,
  //       //         }
  //       //       }
  //       //     }
  //       //   }
  //       // }));
  //     });
  //   });

  //   console.log(streams);
  // }, [currentObjectsIds, streams] );
  // useEffect( () => console.log("currentObjectId update"), [ currentObjectId ] );
  // useEffect( () => console.log("any update") );
  // useEffect( () => () => console.log("currentObjectId update or unmount"), [ currentObjectId ] );
  // useEffect( () => () => {
  //   streams.forEach(stream => stream && stream.cancel())
  // }, [] );
  
  useEffect(() => {
      const streams: any[] = [];
      
      const client = new UnitCoordsClient(process.env.REACT_APP_GRPC || '');
      
      if (currentObjectId) {
        const request = new Unit();
        request.setObjectId(currentObjectId);    
        
        const stream = client.coords(request, {});
        
        streams.push(stream);

        stream.on('data', (r: Point) => {
          const {objectId, latitude, longitude}: Point.AsObject = r.toObject();
          
          dispatch(updateUnitPosition({
            objectId, 
            position: {
              lat: latitude,
              lng: longitude,
            }
          }))
        });
      
      } else {
        currentObjectsIds && currentObjectsIds.forEach(objectId => {
          const request = new Unit();
          request.setObjectId(objectId);    
          
          const stream = client.coords(request, {});
          
          streams.push(stream);
  
          stream.on('data', (r: Point) => {
            const {objectId, latitude, longitude}: Point.AsObject = r.toObject();
            
            dispatch(updateUnitPosition({
              objectId, 
              position: {
                lat: latitude,
                lng: longitude,
              }
            }))
          });
        });
      }

    return () => {
      streams.forEach(stream => stream && stream.cancel());
    };
  }, [dispatch, currentObjectsIds, currentObjectId])

  // useEffect(() => {
  //   if (map) {
  //     if (currentObjectId && currentObject) {
  //       map.setView(currentObject.position, 14);
  //       setTimeout(() => {map.invalidateSize(); }, 300);
  //     } else {
  //       map.setView([55.7522, 37.6156], 10);
  //       setTimeout(() => {map.invalidateSize(); }, 300);
  //     }
  //   }
  // }, [currentObjectId, currentObject, map]);

  const setCurrent = (objectId: UnitId, position: LatLngExpression) => {
    console.log('setCurrent', objectId, position);

    if (currentObjectId === objectId) {
      navigate(`.`) 
    } else {
      navigate(`./${objectId}`)
    }
  }

  return(
    <div className="page-layout">
      <SideBar />

      <ObjectList />

      <Object />

      <div className="map">
        <MapContainer 
          center={[55.7522, 37.6156]}
          zoom={10}
          scrollWheelZoom={true}
          style={{ height: "100vh" }}
          zoomControl={true}
          ref={setMap}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
            {currentObjectsIds 
            && currentObjectsIds.map(objectId => {
              if (currentObjectId && currentObjectId !== objectId) {
                return null;
              }

              return (
                <DriftMarker 
                  key={objectId} 
                  objectId={objectId}
                  onClick={setCurrent}
                />
              )
            })}
        </MapContainer>
      </div>
      
    </div>
  );
}
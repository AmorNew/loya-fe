import React, {useState} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

import SideBar from '../../components/parts/SideBar';
import ObjectList from '../../components/parts/ObjectList';
import Object from '../../components/parts/Object';

import './styles.css';


export default function MapPage({state, setCurrent}: any) {
  const [map, setMap] = useState<any>(null)

  const navigate = useNavigate();

  // const setCurrent = (id: any) => {
  //   setState((prevState: any) => {
  //     const currentObjectId = prevState.data.currentObjectId;
  //     const nextCurrentObject = prevState.collections.objects[id];

  //     if (id !== currentObjectId && id != null && nextCurrentObject) {
  //       map.setView(nextCurrentObject.position, 14);
  //       setTimeout(() => {map.invalidateSize(); }, 300);
  //     } else {
  //       map.setView([55.7522, 37.6156], 10);
  //       setTimeout(() => {map.invalidateSize(); }, 300);
  //     }

  //     return {
  //       ...prevState,
  //       data: {
  //         ...prevState.data,
  //         currentObjectId: id === currentObjectId ? null : id, 
  //       }
  //     }
  //   });
  // }

  return(
    <div className="page-layout">
      <SideBar navigate={navigate} />

      <ObjectList state={state} setCurrent={setCurrent} />

      <Object state={state} />

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
            {state.data.currObjectsIds.map((objectId: any) => {
              const object = state.collections.objects[objectId];
              const {id, position} = object;

              const {currentObjectId} = state.data;

              if (currentObjectId && currentObjectId !== objectId) {
                return null;
              }

              return (
                <Marker 
                  key={id} 
                  position={position} 
                  eventHandlers={{
                    click: () => {
                      setCurrent(id);
                    },
                  }}
                />
              )
            })}
        </MapContainer>
      </div>
      
    </div>
  );
}
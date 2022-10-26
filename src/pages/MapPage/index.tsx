import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

import SideBar from '../../components/parts/SideBar';
import Button from '../../components/ui/Button';

import './styles.css';
import ObjectList from '../../components/parts/ObjectList';


const currObjectsIds: any = [];

const objects = () => {
  const res: any = {};

  const arr = [1,2,3,4,5,6,7,8,9,10];

  arr.forEach((i) => {
    const id = `group-${i}`;

    currObjectsIds.push(id);

    res[id] = {
      id,
      icon: '',
      online: false,
      mark: 'Caterpillar',
      model: '242B Series 3, 2022',
      groupsIds: [],
      lastActive: 'Был активен 30 минут назад',
      position: [55.7522 + i/50, 37.6156 - (i % 2)/10],
    }
  });

  return res;
};

const groups = () => {
  const res: any = {};

  const colors = ['#FDCA4C', '#10B981', '#6366F1'];

  const arr = [1,2,3];

  arr.forEach((i) => {
    const id = `group-${i}`;
    res[id] = {
      id,
      color: colors[i],
      name: id,
    }
  });

  return res;
};

const STATE = {
  data: {
    currentObjectId: null,
    currObjectsIds,
  },
  collections: {
    groups: groups(),
    objects: objects(),
  },
};


export default function MapPage() {
  const [state, setState] = useState<any>(STATE);
  const [map, setMap] = useState<any>(null)


  const setCurrent = (id: any) => {
    setState((prevState: any) => {
      const currentObjectId = prevState.data.currentObjectId;
      const nextCurrentObject = prevState.collections.objects[id];


      if (id !== currentObjectId && id != null && nextCurrentObject) {
        map.setView(nextCurrentObject.position, 14);
      } else {
        map.setView([55.7522, 37.6156], 10);
      }

      return {
        ...prevState,
        data: {
          ...prevState.data,
          currentObjectId: id === currentObjectId ? null : id, 
        }
      }
    });

    
  }

  const navigate = useNavigate();

  return(
    <div className="page-layout">
      <SideBar />

      <ObjectList state={state} setCurrent={setCurrent} />

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
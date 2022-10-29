import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'

import SideBar from '../../components/parts/SideBar';
import Button from '../../components/ui/Button';

import './styles.css';
import ObjectList from '../../components/parts/ObjectList';
import Object from '../../components/parts/Object';
import ObjectCard from '../../components/parts/ObjectCard';


const currObjectsIds: any = [];

const objects = () => {
  const res: any = {};

  const arr = [1,2,3,4,5,6,7,8,9,10];

  arr.forEach((i) => {
    const id = `object-${i}`;

    currObjectsIds.push(id);

    res[id] = {
      id,
      icon: '',
      online: false,
      mark: 'Caterpillar',
      model: `242B Series 3, ${2000 + i}`,
      plate: `A${770 + i}AA99`,
      groupsIds: [1,2,3].map((i) => `group-${i}`),
      lastActive: 'Был активен 30 минут назад',
      position: [55.7522 + i/50, 37.6156 - (i % 2)/10],
      metrics: [{
            name: 'Пробег',
            value: `${i}0 000 км`
        },
        {
            name: 'Моточасы',
            value: `1${i}0 часов`
        },
        {
            name: 'Адрес',
            value: 'Санкт-Петербург Псковская улица, 18'
        },
        {
            name: 'Координаты',
            value: '59.919743, 30.281427'
        },
        {
            name: 'Расход топлива',
            value: '100,0 %'
        },]
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


export default function ObjectPage() {
  const [state, setState] = useState<any>(STATE);
  const [map, setMap] = useState<any>(null)
  const navigate = useNavigate();
  const objectId = useParams();

  const setCurrent = (id: any) => {

    setState((prevState: any) => {
      const currentObjectId = prevState.data.currentObjectId;
      const nextCurrentObject = prevState.collections.objects[id];

      if (id === currentObjectId) {
        navigate(`/object`);
      } else {
        navigate(`/object/${id}`);
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

  useEffect(() => {
    // console.log('useEffect', objectId);

    // if (objectId && state.data.currentObjectId !== objectId) {
    //   setCurrent(objectId);
    // }
  });


  return(
    <div className="page-layout">
      <SideBar navigate={navigate} />

      <ObjectList state={state} setCurrent={setCurrent} />
      
      <Routes>
        <Route path='/:objectId' element={<ObjectCard state={state} />}/>
      </Routes>

      
    </div>
  );
}
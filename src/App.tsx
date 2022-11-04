import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';

import ory from "./pkg/sdk"

import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import ObjectPage from './pages/ObjectPage';

import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';


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
        },],
      properties: [
        {name: 'VIN', value: 'WAUZZZ44ZEN096063'},
        {name: 'Терминал мониторинга', value: 'ЕГТС'},
        {name: 'Уникальный ID', value: 'I7893HY'},
        {name: 'Номер телефона 1', value: '+7 (964) 369-29-05'},
        {name: 'Номер телефона 2', value: '+7 (999) 789-31-11'},
        {name: 'Установленное оборудование', value: 'ГдеМои M5'},
      ],
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

function App() {
  const [state, setState] = useState<any>(STATE);
  const [hasSession, setHasSession] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        // setSession(JSON.stringify(data, null, 2))
        setHasSession(true)
      })
      .catch(() => {
        setHasSession(false)
      });

    axios.post(`${process.env.REACT_APP_API_URL}/status`, {}, {withCredentials: true});
  }, []);

  const setCurrent = (id: any, cb: ({id, prevState}: any) => void) => {
    setState((prevState: any) => {
      const currentObjectId = prevState.data.currentObjectId;

      // const nextCurrentObject = prevState.collections.objects[id];

      // if (id === currentObjectId) {
      //   navigate(`/object`);
      // } else {
      //   navigate(`/object/${id}`);
      // }

      if (typeof cb === 'function') {
        cb({id, prevState});
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

  if (hasSession === undefined) {
    return <>loading...</>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateRoute hasSession={hasSession} />}>
          <Route path="/" element={<Navigate to="/map" />} />
          <Route path='/map/*' element={<MapPage state={state} setCurrent={setCurrent} />}/>
          <Route path='/object/*' element={<ObjectPage state={state} setCurrent={setCurrent} />}/>
        </Route>

        <Route path="/login" element={<LoginPage setHasSession={setHasSession} />} />

        <Route path="*" element={<Navigate to="/map" />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';

import ory from "./pkg/sdk"

import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import ObjectPage from './pages/ObjectPage';

import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';
import { ReadApiAxiosParamCreator } from '@ory/client';


function App() {
  const [session, setSession] = useState<string>(
    "No valid Ory Session was found.\nPlease sign in to receive one.",
  )
  const [hasSession, setHasSession] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        setSession(JSON.stringify(data, null, 2))
        setHasSession(true)
      })
      .catch(() => {
        setHasSession(false)
      });

    axios.post(`${process.env.REACT_APP_API_URL}/status`, {}, {withCredentials: true});
  }, []);

  if (hasSession === undefined) {
    return <>loading...</>
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateRoute hasSession={hasSession} />}>
            <Route path='/' element={<MapPage/>}/>
            <Route path='/map' element={<MapPage/>}/>
            <Route path='/object/*' element={<ObjectPage/>}/>
        </Route>

        <Route path="/login" element={<LoginPage setHasSession={setHasSession} />} />

        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

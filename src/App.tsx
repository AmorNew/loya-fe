import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import ory from "./pkg/sdk"

import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import ObjectPage from './pages/ObjectPage';

import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { removeIdentity, selectUserIdentity, setIdentity } from './app/reducers/userReducer';


function App() {
  const dispatch = useAppDispatch();
  const identity = useAppSelector(selectUserIdentity);

  useEffect(() => {
    if (!identity) {
      ory
      .toSession()
      .then(({ data }) => {  
        dispatch(setIdentity(data.identity));
      })
      .catch(() => {
        dispatch(removeIdentity());
      });
    } else {

    }
  }, [identity, dispatch]);

  if (identity === undefined) {
    return <>loading...</>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateRoute hasSession={Boolean(identity)} />}>
          <Route path="/" element={<Navigate to="/map" />} />
          <Route path='/map/*' element={<MapPage />}/>
          <Route path='/object/*' element={<ObjectPage />}/>
        </Route>

        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<Navigate to="/map" />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

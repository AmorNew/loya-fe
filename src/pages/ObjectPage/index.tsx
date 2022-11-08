import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SideBar from '../../components/parts/SideBar';
import ObjectList from '../../components/parts/ObjectList';
import ObjectCard from '../../components/parts/ObjectCard';

import './styles.css';


export default function ObjectPage({state}: any) {
  return(
    <div className="page-layout">
      <SideBar />

      <ObjectList />
      
      <Routes>
        <Route path='/:objectId' element={<ObjectCard state={state} />}/>
      </Routes>

      
    </div>
  );
}
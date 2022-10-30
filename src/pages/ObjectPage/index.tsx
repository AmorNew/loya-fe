import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';

import SideBar from '../../components/parts/SideBar';
import ObjectList from '../../components/parts/ObjectList';
import ObjectCard from '../../components/parts/ObjectCard';

import './styles.css';


export default function ObjectPage({state, setCurrent}: any) {
  const navigate = useNavigate();
  const objectId = useParams();

  // const setCurrent = (id: any) => {

  //   setState((prevState: any) => {
  //     const currentObjectId = prevState.data.currentObjectId;
  //     const nextCurrentObject = prevState.collections.objects[id];

  //     if (id === currentObjectId) {
  //       navigate(`/object`);
  //     } else {
  //       navigate(`/object/${id}`);
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
      
      <Routes>
        <Route path='/:objectId' element={<ObjectCard state={state} />}/>
      </Routes>

      
    </div>
  );
}
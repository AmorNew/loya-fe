import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SideBar from '../../components/parts/SideBar';
import ObjectList from '../../components/parts/ObjectList';
import ObjectCard from '../../components/parts/ObjectCard';
import ObjectForm from '../../components/parts/ObjectForm';

import styles from'./ObjectPage.module.scss';


export default function ObjectPage() {
  return(
    <div className={styles.layout}>
      <SideBar />

      <ObjectList hideOnlineStatus={true} />

      <div className={styles.cardWrapper}>
        <Routes>
          <Route path='/:objectId' element={<ObjectCard />}/>
          <Route path='/:objectId/edit' element={<ObjectForm mode='edit' />}/>
          <Route path='/new' element={<ObjectForm />}/>
        </Routes>  
      </div>
    </div>
  );
}
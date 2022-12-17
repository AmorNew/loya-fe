import React from 'react';

import SideBar from '../../components/parts/SideBar';
import ObjectList from '../../components/parts/ObjectList';
import Object from '../../components/parts/Object';
import Map from '../../components/parts/Map';

import styles from './MapPage.module.scss';


export default function MapPage() {
  return(
    <div className={styles.layout}>
      <SideBar />

      <ObjectList hideAddObjectButton={true} />

      <Object />

      <Map />
    </div>
  );
}
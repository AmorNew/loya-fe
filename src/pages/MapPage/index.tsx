import React from 'react'

import Map from '../../components/parts/Map'
import Object from '../../components/parts/Object'
import ObjectList from '../../components/parts/ObjectList'
import SideBar from '../../components/parts/SideBar'

import styles from './MapPage.module.scss'

const MapPage = (): JSX.Element => {
    return (
        <div className={styles.layout}>
            <SideBar />

            <ObjectList hideAddObjectButton={true} />

            <Object />

            <Map />
        </div>
    )
}

export default MapPage

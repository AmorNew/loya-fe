import React from 'react'
import { Routes, Route } from 'react-router-dom'

import ObjectCard from '../../components/parts/ObjectCard'
import ObjectForm from '../../components/parts/ObjectForm'
import ObjectList from '../../components/parts/ObjectList'
import SideBar from '../../components/parts/SideBar'

import styles from './ObjectPage.module.scss'

const ObjectPage = (): JSX.Element => {
    return (
        <div className={styles.layout}>
            <SideBar />

            <ObjectList hideOnlineStatus={true} />

            <div className={styles.cardWrapper}>
                <Routes>
                    <Route path='/:objectId' element={<ObjectCard />} />
                    <Route path='/:objectId/edit' element={<ObjectForm mode='edit' />} />
                    <Route path='/new' element={<ObjectForm />} />
                </Routes>
            </div>
        </div>
    )
}

export default ObjectPage

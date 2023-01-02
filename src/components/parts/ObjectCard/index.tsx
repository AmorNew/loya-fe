import cn from 'classnames'
import React, { useState } from 'react'

import { selectUnitById } from '../../../app/api/loyaBackendAPI'
import { useAppSelector } from '../../../app/hooks'

import { selectObjectById } from '../../../app/reducers/collectionsReducer'
import { selectCurrentObjectId } from '../../../app/reducers/dataReducer'

import Icon from '../../ui/Icon'
import ObjectCardWrapper from '../ObjectCardWrapper/intex'

import ObjectCardHeader from './components/ObjectCardHeader'
import ObjectCardHistory from './components/ObjectCardHistory'
import ObjectCardInformation from './components/ObjectCardInformation'
import ObjectCardTabs from './components/ObjectCardTabs'

import styles from './ObjectCard.module.css'

const TABS = [
    { name: 'Свойства', id: 'properties', TabComponent: ObjectCardInformation },
    { name: 'История', id: 'history', TabComponent: ObjectCardHistory },
]

const ObjectCard = () => {
    const [tabs] = useState(TABS)
    const [currentTabId, setCurrentTabId] = useState(TABS[0].id)

    const currentObjectId = useAppSelector(selectCurrentObjectId)
    const currentObject = useAppSelector((state) => selectUnitById(state, currentObjectId))

    if (!currentObjectId || !currentObject) {
        return null
    }

    const { TabComponent } = tabs.find(({ id }) => id === currentTabId) || {}

    return (
        <ObjectCardWrapper>
            <ObjectCardHeader />

            <ObjectCardTabs tabs={tabs} currentTabId={currentTabId} setCurrentTab={setCurrentTabId} />

            {TabComponent && <TabComponent />}
        </ObjectCardWrapper>
    )
}

export default ObjectCard

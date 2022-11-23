import React, { useState } from "react";
import cn from 'classnames';

import ObjectCardHeader from "./components/ObjectCardHeader";
import ObjectCardTabs from "./components/ObjectCardTabs";
import ObjectCardInformation from "./components/ObjectCardInformation";
import ObjectCardHistory from "./components/ObjectCardHistory";
import { useAppSelector } from "../../../app/hooks";
import { selectCurrentObjectId } from "../../../app/reducers/dataReducer";
import { selectObjectById } from "../../../app/reducers/collectionsReducer";

import styles from './ObjectCard.module.css';
import ObjectCardWrapper from "../ObjectCardWrapper/intex";
import { selectUnitById } from "../../../app/api/loyaBackendAPI";
import Icon from "../../ui/Icon";


const TABS = [
    {name: 'Свойства', id: 'properties', TabComponent: ObjectCardInformation},
    {name: 'История', id: 'history', TabComponent: ObjectCardHistory},
];

const ObjectCard = () => {
    const [tabs] = useState(TABS);
    const [currentTabId, setCurrentTabId] = useState(TABS[0].id);
   
    const currentObjectId = useAppSelector(selectCurrentObjectId);
    const currentObject = useAppSelector(state => selectUnitById(state, currentObjectId));

    if (!currentObjectId || !currentObject) {
        return null;
    }

    const {TabComponent} = tabs.find(({id}) => id === currentTabId) || {};

    return (
        <ObjectCardWrapper>
            <ObjectCardHeader />

            <ObjectCardTabs tabs={tabs} currentTabId={currentTabId} setCurrentTab={setCurrentTabId} />

            {TabComponent && <TabComponent />}
        </ObjectCardWrapper>
    );
}

export default ObjectCard;
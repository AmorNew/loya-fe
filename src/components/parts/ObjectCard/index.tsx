import React, {useState, useEffect} from "react";
import cn from 'classnames';
import { useParams } from "react-router-dom";

import styles from './ObjectCard.module.css';
import ObjectCardHeader from "./components/ObjectCardHeader";
import ObjectCardTabs from "./components/ObjectCardTabs";
import ObjectCardInformation from "./components/ObjectCardInformation";
import ObjectCardHistory from "./components/ObjectCardHistory";


const TABS = [
    {name: 'Свойства', id: 'properties', TabComponent: ObjectCardInformation},
    {name: 'История', id: 'history', TabComponent: ObjectCardHistory},
];

const ObjectCard = ({state}: any) => {
    const [tabs] = useState(TABS);
    const [currentTabId, setCurrentTabId] = useState(TABS[0].id);

    const {objectId} = useParams();

    if (!objectId) {
        return null;
    }

    const {TabComponent} = tabs.find(({id}) => id === currentTabId) || {};

    return (
        <div className={cn(styles.root)}>
            <ObjectCardHeader objectId={objectId} state={state} />

            <ObjectCardTabs tabs={tabs} currentTabId={currentTabId} setCurrentTab={setCurrentTabId} />

            {TabComponent && <TabComponent />}
        </div>
    );
}

export default ObjectCard;
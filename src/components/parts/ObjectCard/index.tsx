import React, {useState, useEffect} from "react";
import cn from 'classnames';
import { useParams } from "react-router-dom";

import styles from './ObjectCard.module.css';
import ObjectCardHeader from "./components/ObjectCardHeader";
import ObjectCardTabs from "./components/ObjectCardTabs";
import ObjectCardInformation from "./components/ObjectCardInformation";
import ObjectCardHistory from "./components/ObjectCardHistory";


const ObjectCard = ({state}: any) => {
    const {objectId} = useParams();

    if (!objectId) {
        return null;
    }

    return (
        <div className={cn(styles.root)}>
            <ObjectCardHeader objectId={objectId} state={state} />

            <ObjectCardTabs />

            <ObjectCardInformation />

            <ObjectCardHistory />
        </div>
    );
}

export default ObjectCard;
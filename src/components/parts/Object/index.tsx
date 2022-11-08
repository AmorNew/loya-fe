import React, {useState} from "react";
import cn from 'classnames';

import styles from './Object.module.css';
import ObjectItem from "../ObjectItem";
import { useAppSelector } from "../../../app/hooks";
import { selectCurrentObjectId } from "../../../app/reducers/dataReducer";
import { selectObjectById } from "../../../app/reducers/collectionsReducer";


const Object = () => {
    const currentObjectId = useAppSelector(selectCurrentObjectId);
    const currentObject = useAppSelector(state => selectObjectById(state, currentObjectId));

    return (
        <div className={cn(styles.root, {[styles.hidden]: !currentObjectId})}>
            {currentObject && 
                <>
                    <ObjectItem objectId={currentObjectId} />
                    {currentObject.metrics 
                    && currentObject.metrics.map(({name, value}: any, idx: any) => (
                        <div key={idx} className={styles.metric}>
                            <div className={styles.metricName}>{name}</div>
                            <div className={styles.metricValue}>{value}</div>
                        </div>
                    ))}
                </>

            }
        </div>
    );
}

export default Object;
import React, {useState} from "react";
import cn from 'classnames';

import styles from './Object.module.css';
import ObjectItem from "../ObjectItem";


const Object = ({className, state, setCurrent}: any) => {

    const object = state.collections.objects[state.data.currentObjectId];
    
    return (
        <div className={cn(styles.root, {[styles.hidden]: !state.data.currentObjectId})}>
            {object && 
                <>
                    <ObjectItem {...object} />
                    {object.metrics && object.metrics.map(({name, value}: any, idx: any) => (
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
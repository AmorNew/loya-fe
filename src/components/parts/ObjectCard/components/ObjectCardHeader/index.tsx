import React, {useState} from "react";
import cn from 'classnames';

import styles from './ObjectCardHeader.module.css';
import Plate from "../../../Plate";


const ObjectCardHeader = ({state, objectId}: any) => {
    const {model, mark, plate, groupsIds} = state.collections.objects[objectId];

    return (
        <div className={cn(styles.root)}>
            <div className={styles.icon}></div>
            <div className={styles.summary}>
                <div className={styles.title}>{model}</div>
                <div className={styles.additionalInfo}>
                    <span className={styles.mark}>{mark}</span>
                    <Plate stringPlate={plate}/>
                </div>
                <div className={styles.groups}>
                    {groupsIds.map((_: any, i:any): any => <div key={i} className={styles.group}>group</div>)}
                </div>
            </div>
            <div className={styles.controls}>
                <div className={styles.controlsIcon}></div>
                <div className={styles.controlsIcon}></div>
                <div className={styles.controlsIcon}></div>
            </div>
        </div>
    );
}

export default ObjectCardHeader;
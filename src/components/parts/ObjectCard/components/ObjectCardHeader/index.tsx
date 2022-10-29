import React, {useState} from "react";
import cn from 'classnames';

import styles from './ObjectCardHeader.module.css';


const ObjectCardHeader = ({state, objectId}: any) => {
    const {model, mark, plate, groupsIds} = state.collections.objects[objectId];

    return (
        <div className={cn(styles.root)}>
            <div className={styles.icon}></div>
            <div className={styles.summary}>
                <div className={styles.title}>{model}</div>
                <div className={styles.additionalInfo}>
                    <span className={styles.mark}>{mark}</span>
                    <span className={styles.plate}>{plate}</span>
                </div>
                <div className={styles.groups}>
                    {groupsIds.map(() => <div className={styles.group}>group</div>)}
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
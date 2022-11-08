import React, {useState} from "react";
import cn from 'classnames';

import styles from './ObjectListItem.module.css';
import { useAppSelector } from "../../../app/hooks";
import { selectObjectById } from "../../../app/reducers/collectionsReducer";
import { selectCurrentObjectId } from "../../../app/reducers/dataReducer";


const ObjectItem = ({objectId, onClick, isCurrent}: any) => {
    const currentObjectId = useAppSelector(selectCurrentObjectId);
    const object = useAppSelector((state) => selectObjectById(state, objectId));
    
    if (!object) {
        return null;
    }

    const {model, mark, lastActive} = object;

    return (
        <div className={cn(styles.root, {[styles.isCurrent]: currentObjectId === objectId})} onClick={onClick}>
            <div className={styles.icon}>
                <div className={styles.status} />
            </div>
            <div className={styles.wrapper}>
                <div className={styles.wrapperRow}>
                    <div className={styles.model}>{model}</div>
                    <div className={styles.groups}>
                        {[1,2,3].map((item, idx) => <div key={idx} className={cn(styles.group, styles[`group-${item}`])} />)}
                    </div>
                </div>

                <div className={styles.wrapperRow}>
                    <div className={styles.mark}>{mark}</div>
                    <div className={styles.lastActive}>{lastActive}</div>
                </div>
            </div>
        </div>
    );
}

export default ObjectItem;
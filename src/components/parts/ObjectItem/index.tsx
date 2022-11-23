import React from "react";
import cn from 'classnames';
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../../app/hooks";
import { selectObjectById } from "../../../app/reducers/collectionsReducer";
import { selectCurrentObjectId } from "../../../app/reducers/dataReducer";

import styles from './ObjectListItem.module.css';
import { selectUnitById } from "../../../app/api/loyaBackendAPI";


const ObjectItem = ({objectId, markCurrent = true}: any) => {
    const navigate = useNavigate();
    const currentObjectId = useAppSelector(selectCurrentObjectId);
    // const object = useAppSelector((state) => selectObjectById(state, objectId));

    const object = useAppSelector(state => selectUnitById(state, objectId));
    
    if (!object) {
        return null;
    }

    const isCurrent = markCurrent && currentObjectId === objectId;

    const onClick = () => {
        if (markCurrent) {
            isCurrent ? navigate(`.`) : navigate(`./${objectId}`);
        }
    };
 
    const {visible_name, vehicle: {make, model}} = object;

    const lastActive = 'Был активен 30 минут назад';

    return (
        <div className={cn(styles.root, {[styles.isCurrent]: isCurrent, [styles.clickable]: markCurrent})} onClick={onClick}>
            <div className={styles.icon}>
                <div className={styles.status} />
            </div>
            <div className={styles.wrapper}>
                <div className={styles.wrapperRow}>
                    <div className={styles.model}>{visible_name}</div>
                    <div className={styles.groups}>
                        {[1,2,3].map((item, idx) => <div key={idx} className={cn(styles.group, styles[`group-${item}`])} />)}
                    </div>
                </div>

                <div className={styles.wrapperRow}>
                    <div className={styles.mark}>{make}, {model}</div>
                    <div className={styles.lastActive}>{lastActive}</div>
                </div>
            </div>
        </div>
    );
}

export default ObjectItem;
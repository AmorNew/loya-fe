import React from "react";
import cn from 'classnames';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/ru';

import { useAppSelector } from "../../../app/hooks";
import { selectCurrentObjectId } from "../../../app/reducers/dataReducer";

import { selectUnitById } from "../../../app/api/loyaBackendAPI";
import Icon from "../../ui/Icon";
import { iconTypes } from "../ObjectForm/components/IconSelector";
import { isPointOnline, selectPointByObjectId } from "../../../app/reducers/pointsReducer";

import styles from './ObjectListItem.module.scss';
import { Group } from "../../../app/reducers/collectionsReducer";




const ObjectItem = ({objectId, markCurrent = true, hideOnlineStatus = false}: any) => {
    const navigate = useNavigate();

    const currentObjectId = useAppSelector(selectCurrentObjectId);

    const object = useAppSelector(state => selectUnitById(state, objectId));
    const objectPoint = useAppSelector(state => selectPointByObjectId(state, object?.device?.hw_id));
    
    if (!object) {
        return null;
    }

    const isCurrent = markCurrent && currentObjectId === objectId;

    const onClick = () => {
        if (markCurrent) {
            isCurrent ? navigate(`.`) : navigate(`./${objectId}`);
        }
    };
 
    const {visible_name, icon, vehicle: {make, model}, groups = []} = object;

    const iconProps = iconTypes[icon];
    
    let isOnline = false;
    let lastActive = '';

    if (!hideOnlineStatus && objectPoint) {
        isOnline = isPointOnline(objectPoint);

        const { speed, navigationTime } = objectPoint;

        const navigationDate = new Date(navigationTime).getTime();

        if (speed > 0) {
            lastActive = `${speed} км/ч`;
        }

        if (!isOnline) {
            lastActive = `Был активен ${moment(navigationDate).fromNow()}`
        }
    }

    return (
        <div className={cn(styles.root, {[styles.isCurrent]: isCurrent, [styles.clickable]: markCurrent})} onClick={onClick}>
            <div className={styles.icon} style={{background: iconProps?.background}}>
                {iconProps && <Icon type={iconProps.icon} color={iconProps.color} />}
                {!hideOnlineStatus && <div 
                    className={cn(styles.status, {
                        [styles.online]: isOnline,
                        [styles.play]: objectPoint && objectPoint.speed > 0,
                    })} 
                />}
            </div>
            <div className={styles.wrapper}>
                <div className={styles.wrapperRow}>
                    <div className={styles.model}>{visible_name}</div>
                    {groups && <div className={styles.groups}>
                        {groups.map(({id, type}: Group, idx: number) => (
                            <div key={idx} className={cn(styles.circle, styles[`circle-${type}`])} />
                        ))}
                    </div>}
                </div>

                <div className={styles.wrapperRow}>
                    <div className={styles.mark}>{make}, {model}</div>
                    {!hideOnlineStatus && lastActive && <div className={styles.lastActive}>{lastActive}</div>}
                </div>
            </div>
        </div>
    );
}

export default ObjectItem;
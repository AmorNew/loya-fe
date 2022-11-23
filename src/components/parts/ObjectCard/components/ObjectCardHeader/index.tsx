import React from "react";
import cn from 'classnames';

import LicensePlate from "../../../LicensePlate";
import { useAppSelector } from "../../../../../app/hooks";
import { selectCurrentObjectId } from "../../../../../app/reducers/dataReducer";
import { selectObjectById } from "../../../../../app/reducers/collectionsReducer";

import styles from './ObjectCardHeader.module.css';
import { selectUnitById, useDeleteUnitMutation } from "../../../../../app/api/loyaBackendAPI";
import Icon from "../../../../ui/Icon";
import { useNavigate } from "react-router-dom";


const ObjectCardHeader = () => {
    const [deleteTrigger] = useDeleteUnitMutation();
    const navigate = useNavigate();
    
    const currentObjectId = useAppSelector(selectCurrentObjectId);
    const currentObject = useAppSelector(state => selectUnitById(state, currentObjectId));

    if (!currentObject) {
        return null;
    }

    const { vehicle: {model, make, license_plate}, groupsIds = []} = currentObject;

    return (
        <div className={cn(styles.root)}>
            <div className={styles.icon}></div>
            <div className={styles.summary}>
                <div className={styles.title}>{model}</div>
                <div className={styles.additionalInfo}>
                    <span className={styles.mark}>{make}</span>
                    <LicensePlate stringPlate={license_plate}/>
                </div>
                <div className={styles.groups}>
                    {groupsIds.map((_: any, i:any): any => <div key={i} className={styles.group}>group</div>)}
                </div>
            </div>
            <div className={styles.controls}>
                <Icon type="location" color="grey" onClick={() => navigate(`/map/${currentObjectId}`)}/>
                <Icon type="edit" color="grey" onClick={() => navigate(`/object/${currentObjectId}/edit`)}/>
                <Icon type="delete" color="grey" onClick={() => deleteTrigger({id: Number(currentObjectId)})}/>
            </div>
        </div>
    );
}

export default ObjectCardHeader;
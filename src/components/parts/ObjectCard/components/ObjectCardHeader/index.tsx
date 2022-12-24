import React from "react";
import cn from 'classnames';

import LicensePlate from "../../../LicensePlate";
import { useAppSelector } from "../../../../../app/hooks";
import { selectCurrentObjectId } from "../../../../../app/reducers/dataReducer";

import { selectUnitById, useDeleteUnitMutation, useUnlinkUnitGroupMutation } from "../../../../../app/api/loyaBackendAPI";
import Icon from "../../../../ui/Icon";
import { useNavigate } from "react-router-dom";
import { iconTypes } from "../../../ObjectForm/components/IconSelector";
import Groups from "../../../Groups";

import styles from './ObjectCardHeader.module.scss';


const ObjectCardHeader = () => {
    const navigate = useNavigate();
    const [deleteTrigger] = useDeleteUnitMutation();
    const [unlinkTrigger, unlinkResult] = useUnlinkUnitGroupMutation();
    
    const currentObjectId = useAppSelector(selectCurrentObjectId);
    const currentObject = useAppSelector(state => selectUnitById(state, currentObjectId));

    if (!currentObject) {
        return null;
    }

    const { 
        id, 
        groups, 
        icon, 
        vehicle: {
            model,
            make,
            license_plate,
        }, 
    } = currentObject;

    const iconProps = iconTypes[icon];

    const handleGroupDelete = (groupId: number) => {
        unlinkTrigger({groupId, unitId: id});
    };

    return (
        <div className={cn(styles.root)}>
            <div className={styles.icon} style={{background: iconProps?.background}}>
                {iconProps && <Icon type={iconProps.icon} color={iconProps.color} size='l' />}
            </div>
            <div className={styles.summary}>
                <div className={styles.title}>
                    {model}
                </div>

                <div className={styles.additionalInfo}>
                    <span className={styles.mark}>{make}</span>
                    <LicensePlate stringPlate={license_plate}/>
                </div>

                <Groups groups={groups} onGroupDeleteClick={handleGroupDelete} />
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
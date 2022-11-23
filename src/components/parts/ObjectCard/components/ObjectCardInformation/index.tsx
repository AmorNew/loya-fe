import React, { Fragment } from "react";
import cn from 'classnames';

import { selectCurrentObjectId } from "../../../../../app/reducers/dataReducer";
import { useAppSelector } from "../../../../../app/hooks";
import { selectObjectById } from "../../../../../app/reducers/collectionsReducer";
import { selectUnitById } from "../../../../../app/api/loyaBackendAPI";

import styles from './ObjectCardInformation.module.css';


const ObjectCardInformation = () => {
    const currentObjectId = useAppSelector(selectCurrentObjectId);
    // const currentObject = useAppSelector(state => selectObjectById(state, currentObjectId));
    const currentObject = useAppSelector(state => selectUnitById(state, currentObjectId));

    if (!currentObjectId || !currentObject) {
        return null;
    }

    const {
        visible_name,
        vehicle: {vin}, 
        device: {
            hw_id, 
            // model,
            protocol,
            sim1,
            sim2,
            // vendor,
        }
    } = currentObject;

    const properties = [
        {name: 'Название', value: visible_name},
        {name: 'VIN', value: vin},
        {name: 'Терминал мониторинга', value: protocol},
        {name: 'Уникальный ID', value: hw_id},
        {name: 'Номер телефона 1', value: sim1},
        {name: 'Номер телефона 2', value: sim2},
        {name: 'Установленное оборудование', value: 'ГдеМои M5'},
    ];

    return (
        <div className={cn(styles.root)}>
            {properties.map(({name, value}: any, i: any) => (
                <Fragment key={`${i}-name`}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.value}>{value}</div>
                </Fragment>
            ))}
        </div>
    );
}

export default ObjectCardInformation;
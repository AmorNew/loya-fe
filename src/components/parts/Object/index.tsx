import React from "react";
import cn from 'classnames';

import styles from './Object.module.css';
import ObjectItem from "../ObjectItem";
import { useAppSelector } from "../../../app/hooks";
import { selectCurrentObjectId } from "../../../app/reducers/dataReducer";
import { selectUnitById } from "../../../app/api/loyaBackendAPI";
import { isPointOnline, selectPointByObjectId } from "../../../app/reducers/pointsReducer";
import { useReverseQuery } from "../../../app/api/nominatimAPI";


const Adress = ({lat, lon}: {lat: number, lon: number}) => {

    const adressObject = useReverseQuery({lat, lon});

    return (
        <div className={styles.metric}>
            <div className={styles.metricName}>Адрес</div>
            <div className={styles.metricValue}>{adressObject.data?.display_name}</div>
        </div>
    );
}

const Coords = ({lat, lon}: {lat: number, lon: number}) => {
    return (
        <div className={styles.metric}>
            <div className={styles.metricName}>Координаты</div>
            <div className={styles.metricValue}>{lat}, {lon}</div>
        </div>
    );
}

const Satellite = ({nsat}: {nsat: number | string}) => {
    return (
        <div className={styles.metric}>
            <div className={styles.metricName}>Спутники</div>
            <div className={styles.metricValue}>{nsat}</div>
        </div>
    );
}

const Object = () => {
    const currentObjectId = useAppSelector(selectCurrentObjectId);
    const currentObject = useAppSelector(state => selectUnitById(state, currentObjectId));

    const objectPoint = useAppSelector(state => selectPointByObjectId(state, currentObject?.device?.hw_id));

    return (
        <div className={cn(styles.root, {[styles.hidden]: !currentObjectId})}>
            {currentObject && 
                <>
                    <ObjectItem objectId={currentObjectId} markCurrent={false} />

                    {objectPoint && <Adress lat={objectPoint?.latitude} lon={objectPoint?.longitude} />}
                    
                    {objectPoint && <Coords lat={objectPoint?.latitude} lon={objectPoint?.longitude} />}

                    {objectPoint && <Satellite nsat={isPointOnline(objectPoint) ? objectPoint?.nsat : '-'} />}

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
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

    // {
    //     "house_number": "50",
    //     "road": "улица Степана Разина",
    //     "town": "городское поселение Большое Мурашкино",
    //     "county": "Большемурашкинский район",
    //     "state": "Нижегородская область",
    //     "ISO3166-2-lvl4": "RU-NIZ",
    //     "region": "Приволжский федеральный округ",
    //     "postcode": "606360",
    //     "country": "Россия",
    //     "country_code": "ru"
    //   }

    // {
    //     "amenity": "Гимназия №50",
    //     "road": "Коммунистическая улица",
    //     "city_district": "Канавинский район",
    //     "city": "Нижний Новгород",
    //     "county": "городской округ Нижний Новгород",
    //     "state": "Нижегородская область",
    //     "ISO3166-2-lvl4": "RU-NIZ",
    //     "region": "Приволжский федеральный округ",
    //     "postcode": "603002",
    //     "country": "Россия",
    //     "country_code": "ru"
    //   }

    const { address = {} } = adressObject.data || {};

    const adressArrangeArr: string[] = [
        'state',
        'state_district',
        'county',
        // 'ISO3166-2-lvl',
        'municipality',
        'city',
        'town',
        'village',
        'city_district',
        'district',
        'borough',
        'suburb',
        'subdivision',
        'hamlet',
        'croft',
        'isolated_dwelling',
        'neighbourhood',
        'allotments',
        'quarter',
        'city_block',
        'residential',
        'farm',
        'farmyard',
        'industrial',
        'commercial',
        'retail',
        'road',
        'house_number',
        'house_name',
        'emergency',
        'historic',
        'military',
        'natural',
        'landuse',
        'place',
        'railway',
        'man_made',
        'aerialway',
        'boundary',
        'amenity',
        'aeroway',
        'club',
        'craft',
        'leisure',
        'office',
        'mountain_pass',
        'shop',
        'tourism',
        'bridge',
        'tunnel',
        'waterway',
    ];

    const buildAdress = adressArrangeArr
        .reduce((acc: string[], key: string): string[] => {
                const part = address[key];

                if (part) {
                    acc.push(part);
                }

                return acc;
            }, [])
        .join(', ');

    return (
        <div className={styles.metric}>
            <div className={styles.metricName}>Адрес</div>
            <div className={styles.metricValue}>{buildAdress}</div>
        </div>
    );
}

const Coords = ({lat, lon}: {lat: number, lon: number}) => {
    return (
        <div className={styles.metric}>
            <div className={styles.metricName}>Координаты</div>
            <div className={styles.metricValue}>{Math.round(lat * 1000000) / 1000000}, {Math.round(lon * 1000000) / 1000000}</div>
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
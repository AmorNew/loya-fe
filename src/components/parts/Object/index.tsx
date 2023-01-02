import cn from 'classnames'
import React from 'react'

import { selectUnitById } from '../../../app/api/loyaBackendAPI'
import { useReverseQuery } from '../../../app/api/nominatimAPI'
import { useAppSelector } from '../../../app/hooks'
import { selectCurrentObjectId } from '../../../app/reducers/dataReducer'
import { isPointOnline, selectPointByObjectId } from '../../../app/reducers/pointsReducer'
import ObjectItem from '../ObjectItem'

import styles from './Object.module.css'

const Adress = ({ lat, lon }: { lat: number; lon: number }) => {
    const adressObject = useReverseQuery({ lat, lon })

    const { address = {} } = adressObject.data || {}

    const adressArrangeArr: string[] = [
        'state',
        'state_district',
        'county',
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
    ]

    const buildAdress = adressArrangeArr
        .reduce((acc: string[], key: string): string[] => {
            const part = address[key]

            if (part) {
                acc.push(part)
            }

            return acc
        }, [])
        .join(', ')

    return (
        <div className={styles.metric}>
            <div className={styles.metricName}>Адрес</div>
            <div className={styles.metricValue}>{buildAdress}</div>
        </div>
    )
}

const Coords = ({ lat, lon }: { lat: number; lon: number }) => {
    return (
        <div className={styles.metric}>
            <div className={styles.metricName}>Координаты</div>
            <div className={styles.metricValue}>
                {Math.round(lat * 1000000) / 1000000}, {Math.round(lon * 1000000) / 1000000}
            </div>
        </div>
    )
}

const Satellite = ({ nsat }: { nsat: number | string }) => {
    return (
        <div className={styles.metric}>
            <div className={styles.metricName}>Спутники</div>
            <div className={styles.metricValue}>{nsat}</div>
        </div>
    )
}

const Object = () => {
    const currentObjectId = useAppSelector(selectCurrentObjectId)
    const currentObject = useAppSelector((state) => selectUnitById(state, currentObjectId))

    const objectPoint = useAppSelector((state) => selectPointByObjectId(state, currentObject?.device?.hw_id))

    return (
        <div className={cn(styles.root, { [styles.hidden]: !currentObjectId })}>
            {currentObject && (
                <>
                    <ObjectItem objectId={currentObjectId} markCurrent={false} />

                    {objectPoint && <Adress lat={objectPoint?.latitude} lon={objectPoint?.longitude} />}

                    {objectPoint && <Coords lat={objectPoint?.latitude} lon={objectPoint?.longitude} />}

                    {objectPoint && <Satellite nsat={isPointOnline(objectPoint) ? objectPoint?.nsat : '-'} />}

                    {currentObject.metrics &&
                        currentObject.metrics.map(({ name, value }: any, idx: any) => (
                            <div key={idx} className={styles.metric}>
                                <div className={styles.metricName}>{name}</div>
                                <div className={styles.metricValue}>{value}</div>
                            </div>
                        ))}
                </>
            )}
        </div>
    )
}

export default Object

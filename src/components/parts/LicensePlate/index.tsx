import React from 'react'

import parsePlate from '../../../utils/parsePlate'

import styles from './LicensePlate.module.css'

const Plate = ({ stringPlate }: { stringPlate: string }) => {
    const { fullPlate, firstPart, secondPart, thirdPart, region } = parsePlate(stringPlate)

    if (!firstPart || !secondPart || !thirdPart || !region) {
        return <div className={styles.root}>{fullPlate}</div>
    }

    return (
        <div className={styles.root}>
            <span>{firstPart}</span>
            <span>{secondPart}</span>
            <span>{thirdPart}</span>
            <span className={styles.region}>{region}</span>
        </div>
    )
}

export default Plate

import React, {useState, useEffect} from "react";
import cn from 'classnames';

import styles from './Plate.module.css';
import parsePlate from "../../../utils/parsePlate";

 
const Plate = ({stringPlate}: {stringPlate: string}) => {
    const {
        fullPlate, 
        firstPart, 
        secondPart, 
        thirdPart, 
        region
    } = parsePlate(stringPlate);

    if (!firstPart || !secondPart || !thirdPart || !region) {
        return (
            <div className={styles.root}>
                {fullPlate}
            </div>
        );
    }

    return (
        <div className={styles.root}>
            <span>{firstPart}</span>
            <span>{secondPart}</span>
            <span>{thirdPart}</span>
            <span className={styles.region}>{region}</span>
        </div>
    );
}

export default Plate;
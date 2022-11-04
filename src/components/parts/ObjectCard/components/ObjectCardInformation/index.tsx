import React, {useState, Fragment} from "react";
import cn from 'classnames';

import styles from './ObjectCardInformation.module.css';


const ObjectCardInformation = ({state}: any) => {
    if (!state.data.currentObjectId) {
        return null;
    }

    const {properties} = state.collections.objects[state.data.currentObjectId];

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
import React, {useState} from "react";
import cn from 'classnames';

import styles from './ObjectListFilters.module.css';


const ObjectListFilters = ({className}: any) => {
    return (
        <div className={styles.root}>
            <div className={styles.filterButton}></div>
            <div className={styles.filterInput}></div>
            <div className={styles.sortButton}></div>
        </div>
    );
}

export default ObjectListFilters;
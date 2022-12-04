import React, {useState} from "react";
import cn from 'classnames';

import styles from './ObjectListFilters.module.scss';
import { selectSearchParams, setSearchParams } from "../../../../../app/reducers/dataReducer";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import Icon from "../../../../ui/Icon";


const ObjectListFilters = () => {
    const searchParams = useAppSelector(selectSearchParams);
    const dispatch = useAppDispatch();

    const { order_direction } = searchParams;

    const handleSearchChange = (text: string) => {
        dispatch(setSearchParams({text}));
    };

    const handleSearchSort = () => {
        dispatch(setSearchParams({order_direction: order_direction === 'asc' ? 'desc' : 'asc' }));
    };

    return (
        <div className={styles.root}>
            <div className={styles.filterButton}>
                <Icon className={styles.filterIcon} type='filter' color='grey' />
            </div>
            
            <div className={styles.filterInputWrapper}>
                <input type='text' className={styles.filterInput} placeholder="Поиск" onChange={e => handleSearchChange(e.target.value)} />
                <Icon className={styles.searhIcon} type='search' color="grey" />
            </div>
            
            <div className={styles.sortButton} onClick={handleSearchSort}>
                <Icon className={styles.sortIcon} type={`sort${order_direction?.toUpperCase() || 'ASC'}`} color='grey' />
            </div>
        </div>
    );
}

export default ObjectListFilters;
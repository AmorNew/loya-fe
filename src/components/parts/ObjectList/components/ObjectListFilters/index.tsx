import React, { useState } from "react";

import styles from './ObjectListFilters.module.scss';
import { selectSearchParams, setSearchParams } from "../../../../../app/reducers/dataReducer";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import Icon from "../../../../ui/Icon";
import GroupSelector from "../../../GroupSelector";
import { selectAllGroups } from "../../../../../app/api/loyaBackendAPI";
// import Modal from "../../../Modal";


const ObjectListFilters = () => {
    const searchParams = useAppSelector(selectSearchParams);
    const dispatch = useAppDispatch();

    const { order_direction } = searchParams;

    let timerId: any;

    const handleSearchChange = (text: string) => {
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => dispatch(setSearchParams({text})), 600);
    };

    const handleSearchSort = () => {
        dispatch(setSearchParams({order_direction: order_direction === 'asc' ? 'desc' : 'asc' }));
    };

    const handleGroupSelect = (group_ids: number[]) => {
        dispatch(setSearchParams({group_ids}));
    };

    return (
        <div className={styles.root}>
            <GroupSelector 
                creatable={false}
                filter={true}
                onChange={handleGroupSelect}
            />
            
            <div className={styles.filterInputWrapper}>
                <input 
                    type='text' 
                    className={styles.filterInput} 
                    placeholder="Поиск" 
                    onChange={e => handleSearchChange(e.target.value)} 
                />

                <Icon 
                    type='search' 
                    color="grey" 
                    className={styles.searhIcon} 
                />
            </div>
            
            <div className={styles.sortButton} onClick={handleSearchSort}>
                <Icon 
                    type={`sort${order_direction?.toUpperCase() || 'ASC'}`} 
                    color='grey' 
                    className={styles.sortIcon} 
                />
            </div>
        </div>
    );
}

export default ObjectListFilters;
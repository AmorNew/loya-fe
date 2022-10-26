import React, {useState} from "react";
import cn from 'classnames';

import styles from './ObjectList.module.css';
import ObjectListFilters from "./components/ObjectListFilters";
import ObjectItem from "../ObjectItem";


const ObjectList = ({className, state, setCurrent}: any) => {
    return (
        <div className={styles.root}>
            <ObjectListFilters />

            <div className={styles.listWrapper}>
                {state.data.currObjectsIds
                    .map((objectId: any, idx: any) => {
                        const object = state.collections.objects[objectId];
                        const isCurrent = state.data.currentObjectId === objectId;

                        return (
                            <ObjectItem 
                                key={object.id}
                                isCurrent={isCurrent} 
                                onClick={() => setCurrent(objectId)} 
                                {...object} 
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ObjectList;
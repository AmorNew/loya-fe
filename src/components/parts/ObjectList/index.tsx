import React, {useState, useEffect} from "react";
import cn from 'classnames';
import { useLocation, useNavigate, useRoutes, useResolvedPath } from "react-router-dom";

import styles from './ObjectList.module.css';
import ObjectListFilters from "./components/ObjectListFilters";
import ObjectItem from "../ObjectItem";


const ObjectList = ({className, state, setCurrent}: any) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const objectId = location.pathname.split('/')[2];
        
        console.log('location.pathname', location.pathname);

        if (state.data.currentObjectId !== objectId) {
            setCurrent(objectId);
        }

    }, [location.pathname, setCurrent, state.data.currentObjectId]);

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
                                onClick={() => {if (isCurrent) {navigate(`./`)} else {navigate(`./${objectId}`)}}} 
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
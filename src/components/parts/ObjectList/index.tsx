import React, {useState, useEffect} from "react";
import cn from 'classnames';
import { useLocation, useNavigate, useRoutes, useResolvedPath } from "react-router-dom";

import styles from './ObjectList.module.css';
import ObjectListFilters from "./components/ObjectListFilters";
import ObjectItem from "../ObjectItem";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectCurrentObjectsIds, selectCurrentObjectId, setCurrentObjectId } from "../../../app/reducers/dataReducer";


const ObjectList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const currentObjectsIds = useAppSelector(selectCurrentObjectsIds);
    // const currentObjectId = useAppSelector(selectCurrentObjectId);

    useEffect(() => {
        const objectId = location.pathname.split('/')[2];
        
        dispatch(setCurrentObjectId(Number(objectId)));

    }, [location.pathname, dispatch]);

    return (
        <div className={styles.root}>
            <ObjectListFilters />

            <div className={styles.listWrapper}>
                {currentObjectsIds 
                && currentObjectsIds.map((objectId: any, idx: any) => {
                        return (
                            <ObjectItem 
                                key={objectId}
                                objectId={objectId}
                                // isCurrent={currentObjectId === objectId} 
                                // onClick={() => {currentObjectId === objectId ? navigate(`.`) : navigate(`./${objectId}`)}}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ObjectList;
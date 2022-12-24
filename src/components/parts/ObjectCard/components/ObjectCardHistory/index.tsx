import React from "react";
import cn from 'classnames';

import styles from './ObjectCardHistory.module.css';
import { useAppSelector } from "../../../../../app/hooks";
import { selectCurrentObjectId } from "../../../../../app/reducers/dataReducer";
import { useFilterUnitHistoryQuery } from "../../../../../app/api/loyaBackendAPI";


const ObjectCardHistory = ({state}: any) => {
    const currentObjectId = useAppSelector(selectCurrentObjectId);
    const history = useFilterUnitHistoryQuery({unit_id: currentObjectId});

    console.log(history);

    return (
        <div className={cn(styles.root)}>
            ObjectCardHistory
        </div>
    );
}

export default ObjectCardHistory;
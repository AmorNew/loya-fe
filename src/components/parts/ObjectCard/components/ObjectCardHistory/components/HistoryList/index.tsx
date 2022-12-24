import React from "react";
import cn from 'classnames';
import { Event as EventType } from "../../../../../../../app/api/loyaBackendAPI";

import styles from './HistoryList.module.scss';
import Event from "../Event";


type Props = {
    history: EventType[],
};

const HistoryList = ({history}: Props) => {

    return (
        <div className={cn(styles.root)}>
            {history.map((event: EventType) => (
                <Event key={event.created_at} event={event} />
            ))}
        </div>
    );
}

export default HistoryList;
import React from "react";
import cn from 'classnames';

import { Group as GroupType } from "../../../../../app/reducers/collectionsReducer";
import Icon from "../../../../ui/Icon";

import styles from './Group.module.scss';
import { useUnlinkUnitGroupMutation } from "../../../../../app/api/loyaBackendAPI";


const Group = ({
    id, 
    name, 
    type, 
    onDeleteClick
}: GroupType & {onDeleteClick: (groupId: number) => void}) => {

    return (
        <div 
            className={cn(styles.root, styles[`group-${type}`])}
        >
            <div className={cn(styles.circle, styles[`circle-${type}`])} />

            {name}

            {id && <Icon type="cross" className={styles.cross} color="grey" onClick={() => onDeleteClick(id)} />}
        </div>
    );
}

export default Group;

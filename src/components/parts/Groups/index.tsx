import React, { useState } from "react";
import { useUnlinkUnitGroupMutation } from "../../../app/api/loyaBackendAPI";
import { Group as GroupType } from "../../../app/reducers/collectionsReducer";

import Group from "./components/Group";

import styles from './Groups.module.scss';

type Props = {
    // unitId: number, 
    groups: GroupType[],
    onGroupDeleteClick?: (groupId: number) => void,
};

const Groups = ({
    // unitId, 
    groups = [],
    onGroupDeleteClick, 
}: Props) => {
    // const [unlinkTrigger, unlinkResult] = useUnlinkUnitGroupMutation();

    const handleDeleteClick = (groupId: number) => {
        // unlinkTrigger({groupId, unitId});
        onGroupDeleteClick && onGroupDeleteClick(groupId);
    };

    return (
        <div className={styles.root}>
            {groups && groups.map(({id, name, type}) => {
                return (
                    <Group 
                        key={`group-${id}`} 
                        id={id}
                        name={name}
                        type={type}
                        onDeleteClick={handleDeleteClick}
                    />
                );
            })}
        </div>
    );
}

export default Groups;
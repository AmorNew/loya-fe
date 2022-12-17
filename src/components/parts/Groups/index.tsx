import React, { useState } from "react";
import { useCreateGroupMutation, useLinkUnitGroupMutation, useUnlinkUnitGroupMutation } from "../../../app/api/loyaBackendAPI";
import { Group as GroupType } from "../../../app/reducers/collectionsReducer";
import Input from "../../ui/Input";
import Group from "./components/Group";

import styles from './Groups.module.scss';


function randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

const Groups = ({unitId, groups = []}: {unitId: number, groups: GroupType[]}) => {
    const [values, setValues] = useState<any>({});

    const [createTrigger, createResult] = useCreateGroupMutation();
    const [linkTrigger, linkResult] = useLinkUnitGroupMutation();
    const [unlinkTrigger, unlinkResult] = useUnlinkUnitGroupMutation();

    const handleSubmit = async (e: any) => {
        e.stopPropagation()
        e.preventDefault()
 
        const {groupId} = values;

        linkTrigger({unitId, groupId: Number(groupId)})
    };
    

    const handleAddClick = () => {

        const type = randomIntFromInterval(0, 12);
        const name = randomIntFromInterval(0, 99999);


        createTrigger({
            name: `Группа ${name}`,
            type,
        });
    }

    const handleDeleteClick = (groupId: number) => {
        unlinkTrigger({groupId, unitId});
    }

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

            {/* <form onSubmit={handleSubmit}>
                <Input 
                    type="text" 
                    name="groupId" 
                    size="s"
                    value={values.groupId}  
                    onChange={(value: any) => {
                        setValues((prevValues: any) => ({
                            ...prevValues,
                            groupId: value,
                        }))
                    }} />
                <button type="submit">Добавить группу</button> 
            </form> */}
        </div>
    );
}

export default Groups;
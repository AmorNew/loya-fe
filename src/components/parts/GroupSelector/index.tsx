import React, { useState } from "react";
import cn from 'classnames';
import AsyncSelect from 'react-select/async-creatable';
import Select from 'react-select';

import { Group } from "../../../app/reducers/collectionsReducer";
import { useLazyFilterGroupsQuery } from "../../../app/api/loyaBackendAPI";

import Modal from "../Modal";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

import styles from './GroupSelector.module.scss';
import GroupForm from "../GroupForm";


export interface Option {
    readonly value: number;
    readonly label: string;
    readonly type: number;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
  }

export const GroupSelector = ({object = {}, onChange}: {object?: any, onChange: (value: number[]) => void}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [cacheOptions, setCacheOptions] = useState<string>('');
    const [value, setValue] = useState<Option[]>(object.groups?.map(({
        id,
        name,
        type,
    }: Group) => {
        
        const option = {
            value: id,
            label: name,
            type,
        };

        return option;

    }));
    
    const [newGroupName, setNewGroupName] = useState<string>('');
    
    const [trigger, result, lastPromiseInfo] = useLazyFilterGroupsQuery();

    const promiseOptions = (inputValue: string) => 
        new Promise<Option[]>((resolve) => {
            trigger({text: inputValue})
                .then(res => {
                    const options = res.data.result.groups.reduce((acc: Option[], {
                        id,
                        name,
                        type,
                    }: Group) => {

                        if (name.includes(inputValue)) {

                            const option = {
                                value: id,
                                label: name,
                                type,
                            };
                            
                            acc.push(option);
                        }

                        return acc;
                    }, []);

                    setCacheOptions('loaded');
                    resolve(options);
                });
        });

    const handleCreate = (inputValue: string) => {
        setNewGroupName(inputValue);
        setIsLoading(true);
        setShowModal(true);
    };

    return (
        <>
            <AsyncSelect
                isMulti
                isDisabled={isLoading}
                isLoading={isLoading}
                onCreateOption={handleCreate}
                isClearable
                cacheOptions={cacheOptions}
                defaultOptions
                // defaultValue={defaultValue}
                value={value}
                loadOptions={promiseOptions}
                closeMenuOnSelect={false}
                placeholder="Выберите группы"
                classNames={{
                    container: () => {
                        return cn({
                            [styles.container]: true,
                        });
                    },
                    control: (state) =>
                        cn({
                            [styles.control]: true,
                            [styles.focused]: state.isFocused,
                        }),

                    indicatorsContainer: () => {
                        return cn({
                            [styles.indicators]: true,
                        });
                    },
                    clearIndicator: () => {
                        return cn({
                            [styles.indicator]: true,
                        });
                    }, 
                    dropdownIndicator: () => {
                        return cn({
                            [styles.indicator]: true,
                        });
                    },
                    valueContainer: () => styles.valueContainer,
                    placeholder: () => styles.placeholder,

                    multiValue: (props) => {
                        return cn({
                            [styles[`type-${props.data.type}`]]: true,
                            [styles.multiValue]: true,
                        });
                    },
                    multiValueRemove: () => styles.remove,
                }}
                onChange={(newValue, meta) => {
                    switch(meta.action) {
                        case "clear":
                            setValue([]);
                            break;
                        case "select-option":
                            setValue((prevValue: any) => {
                                console.log('prevValue', prevValue);
                                
                                return [...prevValue, meta.option];
                            });
                            break;
                        // case "deselect-option":
                        case "remove-value":
                            setValue((prevValue: any) => {
                                console.log('prevValue', prevValue);
                                
                                return prevValue.reduce((acc: Option[], option: Option)=> {
                                    if (meta.removedValue.value !== option.value) {
                                        acc.push(option);
                                    }
                                    
                                    return acc;
                                }, []);
                            });
                            break;
                        // case "pop-value":
                        // case "create-option":
                    }
    
                    const value = newValue.map(({value}) => value);

                    onChange(value);
                }}
                
            />

            <Modal show={showModal} onClose={() => {
                setIsLoading(false);
                setShowModal(false);
            }}>
                <GroupForm 
                    newGroupName={newGroupName} 
                    onSubmit={(newGroup) => {
                        setIsLoading(false);
                        setShowModal(false);
                        setCacheOptions('created');

                        setValue((prevValue: any) => {
                            const {
                                id,
                                name,
                                type,
                            } = newGroup;

                            const newOption = {
                                value: id,
                                label: name,
                                type,
                            };
                            
                            return [...prevValue, newOption];
                        });
                    }}    
                />
            </Modal>
        </>
    );
};

export default GroupSelector;
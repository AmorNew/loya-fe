import React, { useEffect, useRef, useState } from "react";
import cn from 'classnames';
import AsyncSelectCreatable from 'react-select/async-creatable';
import AsyncSelect from 'react-select/async';
import { ActionMeta, MultiValue, components as selecComponents } from 'react-select';

import { Group } from "../../../app/reducers/collectionsReducer";
import { useLazyFilterGroupsQuery, useLinkUnitGroupMutation, useUnlinkUnitGroupMutation } from "../../../app/api/loyaBackendAPI";

import Modal from "../Modal";
import GroupForm from "../GroupForm";

import styles from './GroupSelector.module.scss';
import Icon from "../../ui/Icon";


export interface Option {
    readonly value: number;
    readonly label: string;
    readonly type: number;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}

type Props = {
    object?: any, 
    creatable?: boolean,
    filter?: boolean,
    ControlComponent?: React.Component,
    onChange?: (value: number[]) => void,
};

export const GroupSelector = ({
    object = {}, 
    creatable = true,
    filter = false,
    onChange
}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    
    const [newGroupName, setNewGroupName] = useState<string>('');
    const [options, setOptions] = useState<Option[]>([]);
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

    }) || []);
    
    const [trigger, result, lastPromiseInfo] = useLazyFilterGroupsQuery();

    const [linkTrigger, linkResult] = useLinkUnitGroupMutation();
    const [unlinkTrigger, unlinkResult] = useUnlinkUnitGroupMutation();

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

                    setOptions(options);
                    resolve(options);
                });
        });

    const handleCreate = (inputValue: string) => {
        setNewGroupName(inputValue);
        setIsLoading(true);
        setShowModal(true);
    };

    const handleChange = (newValue: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
        switch(actionMeta.action) {
            case "clear":
                if (object && object.id) {
                    value.forEach((option) => {
                        unlinkTrigger({unitId: object.id, groupId: Number(option.value)})
                    });
                } 

                setValue([]);
                break;
            case "select-option":
                if (object && object.id && actionMeta.option?.value) {
                    linkTrigger({unitId: object.id, groupId: Number(actionMeta.option?.value)});
                } 

                setValue((prevValue: any) => {
                    return [...prevValue, actionMeta.option];
                });
                break;
            case "deselect-option":
                if (object && object.id && actionMeta.option?.value) {
                    linkTrigger({unitId: object.id, groupId: Number(actionMeta.option?.value)});
                } 

                setValue((prevValue: any) => {
                    return prevValue.reduce((acc: Option[], option: Option)=> {
                        if (actionMeta?.option?.value !== option.value) {
                            acc.push(option);
                        }
                        
                        return acc;
                    }, []);
                });
                break;
            case "remove-value":
                if (object && object.id && actionMeta.removedValue?.value) {
                    unlinkTrigger({unitId: object.id, groupId: Number(actionMeta.removedValue?.value)});
                } 

                setValue((prevValue: any) => {
                    return prevValue.reduce((acc: Option[], option: Option)=> {
                        if (actionMeta.removedValue.value !== option.value) {
                            acc.push(option);
                        }
                        
                        return acc;
                    }, []);
                });
                break;
            // case "pop-value":
            // case "create-option":
        }

        onChange && onChange(newValue.map(({value}) => value));
    };

    const handleModalClose = () => {
        setIsLoading(false);
        setShowModal(false);
    };

    const handleFormSubmit = (newGroup: any) => {
        setIsLoading(false);
        setShowModal(false);

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
    };

    const Select = creatable ? AsyncSelectCreatable : AsyncSelect;

    let components;
    const additionalProps: any = {};
    
    if (filter) {
        const DropdownIndicator = (props: any) => {
            return (
                selecComponents.DropdownIndicator && (
                <selecComponents.DropdownIndicator {...props}>
                    <Icon 
                        type='filter' 
                        color='grey' 
                        className={styles.filterIcon}
                    />
                </selecComponents.DropdownIndicator>
                )
            );
        };

        components = {
            DropdownIndicator,
        }

        additionalProps.components = components;
    }

    return (
        <>
            <Select
                hideSelectedOptions={!filter}
                
                isMulti
                isClearable
                defaultOptions
                cacheOptions
                
                value={value}
                closeMenuOnSelect={false}
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={handleChange}
                onCreateOption={handleCreate}
                options={options}
                loadOptions={promiseOptions}
                placeholder="Выберите группы"

                noOptionsMessage={() => <div>Ничего не найдено</div>}
                loadingMessage={() => <div>Загрузка...</div>}
                formatCreateLabel={inputValue => <div>{`Создать группу "${inputValue}"`}</div>}
                classNames={{
                    container: () => filter ? undefined : styles.container,
                    control: (state) => cn(
                        styles.control,
                        {
                            [styles.focused]: state.isFocused,
                            [styles.filter]: filter,
                            [styles.selected]: filter && state.hasValue,
                        }
                    ),
                    indicatorsContainer: () => filter ? styles.filterIndicators : styles.indicators,
                    clearIndicator: () => filter ? styles.hiddenIndicator : styles.indicator, 
                    dropdownIndicator: () => filter ? styles.filterDropdownIndicator : styles.indicator,
                    indicatorSeparator: () => filter ? styles.hiddenIndicator : undefined,
                    valueContainer: () => filter ? styles.hiddenValueContainer : styles.valueContainer,
                    placeholder: () => styles.placeholder,
                    multiValue: (props: any) => cn(
                        styles.multiValue, 
                        {
                            [styles[`type-${props.data.type}`]]: true,
                        }
                    ),
                    multiValueRemove: () => styles.remove,
                    option: (props: any) => cn(
                        styles.option, 
                        {
                            [styles.selected]: props.isSelected,
                            [styles.focused]: props.isFocused,
                            [styles[`type-${props.data.type}`]]: true,
                        }
                    ),
                    menu: () => filter ? styles.menu : undefined,
                    menuList: () => filter ? styles.menuList : undefined,
                }}

                {...additionalProps}
            />

            {creatable && <Modal 
                show={showModal} 
                onClose={handleModalClose}
            >
                <GroupForm 
                    newGroupName={newGroupName} 
                    onSubmit={handleFormSubmit}    
                />
            </Modal>}
        </>
    );
};

export default GroupSelector;
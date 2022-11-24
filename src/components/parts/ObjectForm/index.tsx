import React, { useState } from "react";
import cn from 'classnames';

import ObjectCardWrapper from "../ObjectCardWrapper/intex";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { selectUnitById, useCreateUnitMutation, useUpdateUnitMutation } from "../../../app/api/loyaBackendAPI";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { selectCurrentObjectId } from "../../../app/reducers/dataReducer";

import styles from './ObjectForm.module.scss';
import IconSelector from "./components/IconSelector";


type Props = {
    mode?: 'new' | 'edit'
}

const formSchema = [
    {rowName: 'Название', props: {labelText: 'Название', name: "visible_name"}},
    {rowName: 'Стиль иконки', props: {labelText: 'Стиль иконки', name: "icon"}},
    {rowName: 'Марка', props: {labelText: 'Марка', name: "make"}},
    {rowName: 'Модель', props: {labelText: 'Модель', name: "model"}},
    {rowName: 'Гос. номер', props: {labelText: 'Гос. номер', name: "license_plate"}},
    {rowName: 'Группа', props: {labelText: 'Группа', name: "group"}},
    {rowName: 'VIN', props: {labelText: 'VIN', name: "vin"}},
    {rowName: 'Терминал мониторинга', props: {labelText: 'Терминал мониторинга', name: "terminal", value: 'ЕГТС', disabled: true}},
    {rowName: 'Уникальный ID', props: {labelText: 'Уникальный ID', name: "hw_id"}},
    {rowName: 'Номер телефона 1', props: {labelText: 'Номер телефона 1', name: "sim1"}},
    {rowName: 'Номер телефона 2', props: {labelText: 'Номер телефона 2', name: "sim2"}},
];

const iconTypes = {
    blackTruck: {
        color: '#1B1F26',
        background: '#F1F5F9',
        icon: 'truck',
    },
    
    breezeRoadhelp: {
        color: '#155E75',
        background: '#EFF6FF',
        icon: 'roadhelp',
    },
    
    purpleCar: {
        color: '#6366F1',
        background: '#E0E7FF',
        icon: 'car',
    },
    
    cyanTruck: {
        color: '#06B6D4',
        background: '#ECFEFF',
        icon: 'truck',
    },
    
    greenRoadhelp: {
        color: '#10B981',
        background: '#F0FDFA',
        icon: 'roadhelp',
    },
};

const Form = ({mode, object = {}}: {mode: string, object?: any}) => {
    const [values, setValues] = useState<any>(formSchema.reduce((acc, item) => {
        acc[String(item.props.name)] = object[item.props.name] || item.props?.value || ''; 
        return acc;
    }, {} as any));

    const [createTrigger, createResult] = useCreateUnitMutation();
    const [updateTrigger, updateResult] = useUpdateUnitMutation();

    // console.log('updateResult', updateResult);

    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.stopPropagation()
        e.preventDefault()

        console.log('submit', values);
        


        if (mode === 'edit') {
            handleUpdate();
        } else if (mode === 'new') {
            handleCreate();
        }
    };

    const handleCreate = async () => {
        const {
            group,
            hw_id,
            icon,
            license_plate,
            make,
            model,
            visible_name,
            sim1,
            sim2,
            terminal,
            vin,
        } = values;

        if (
            hw_id &&
            icon &&
            license_plate &&
            make &&
            model &&
            visible_name &&
            sim1 &&
            sim2 &&
            vin
        ) {
            createTrigger({
                device: {
                    id: 666,
                    hw_id,
                    vendor: "",
                    model: "",
                    protocol: "egts",
                    sim1,
                    sim2,
                },
                icon,
                vehicle: {
                    id: 666,
                    license_plate,
                    make,
                    model,
                    type: 2,
                    vin,
                },
                visible_name,
                created_at: "",
                id: 0,
                updated_at: ""
            }).then(({data}: any) => { 
                navigate(`/object/${data?.result?.id}`)
            });
        } else {
            console.log('error');
        }
    }

    const handleUpdate = async () => {
        const {id}= object;

        const {
            group,
            hw_id,
            icon,
            license_plate,
            make,
            model,
            visible_name,
            sim1,
            sim2,
            terminal,
            vin,
        } = values;

        if (
            hw_id !== object[hw_id] ||
            icon !== object[icon] ||
            license_plate !== object[license_plate] ||
            make !== object[make] ||
            model !== object[model] ||
            visible_name !== object[visible_name] ||
            sim1 !== object[sim1] ||
            sim2 !== object[sim2] ||
            vin !== object[vin]
        ) {
            updateTrigger({
                id,
                device: {
                    hw_id,
                    vendor: "",
                    model: "",
                    protocol: "egts",
                    sim1,
                    sim2,
                },
                icon,
                vehicle: {
                    license_plate,
                    make,
                    model,
                    type: 2,
                    vin,
                },
                visible_name,
            }).then(() => navigate(`/object/${id}`));
        } else {
            console.log('error');
        }
    }

    return (
        <form 
            className={cn(styles.form, {[styles.locked]: createResult.isLoading || updateResult.isLoading})}
            onSubmit={handleSubmit}
        >
            {formSchema.map(({rowName, props: {
                labelText, 
                name,
                disabled,
            }}, index) => {
                
                if (name === 'icon') {
                    return (
                        <div key={`${name}-${index}`} className={styles.row}>
                            <div className={styles.name}>
                                {rowName}
                            </div>

                            <IconSelector 
                                value={values[name]}
                                onIconClick={(value: string) => {
                                    setValues((prevValues: any) => ({
                                        ...prevValues,
                                        [name]: value,
                                    }))
                                }} 
                            />
                        </div>
                    );
                }

                return (
                    <div  key={`${name}-${index}`} className={styles.row}>
                        <div className={styles.name}>
                            {rowName}
                        </div>
                        
                        <Input 
                            size="s"
                            disabled={disabled}
                            className={styles.input} 
                            labelText={labelText} 
                            name={name}
                            value={values[name]}
                            onChange={(value: any) => {
                                setValues((prevValues: any) => ({
                                    ...prevValues,
                                    [name]: value,
                                }))
                            }}
                        />
                    </div>
                );
            })}

            <div className={styles.buttonRow}>
                <Button type="button" buttonStyle="secondary" shrink={true} onClick={() => {console.log('ГАЛЯ! У НАС ОТМЕНА!'); navigate(-1);}}>
                    Отменить
                </Button>

                <Button type="submit" shrink={true}>
                    {mode === 'new' ? '+ Добавить новый объект' : 'Сохранить изменения'}
                </Button>
            </div>
        </form>
    );
}

const ObjectForm = ({mode = 'new'}: Props) => {
    const currentObjectId = useAppSelector(selectCurrentObjectId);
    const currentObject = useAppSelector(state => selectUnitById(state, currentObjectId));

    let object;

    if (currentObject) {
        const {
            device: {                
                hw_id,                
                protocol,
                sim1,
                sim2,
            },
            icon,
            vehicle: {                
                license_plate,
                make,
                model,
                vin,
            },
            visible_name,
            id,
        } = currentObject;

        object = {
            id,
            hw_id,                
            protocol,
            sim1,
            sim2,
            icon,
            license_plate,
            make,
            model,
            vin,
            visible_name,
        };
    }
    
    return (
        <ObjectCardWrapper>
            <h2 className={cn(styles.title)}>
                {mode === 'new' ? 'Новый объект' : 'Редактирование объекта'}
            </h2>

            {mode === 'edit' && object && <Form mode={mode} object={object}/>}
            {mode === 'new' && <Form mode={mode} />}
        </ObjectCardWrapper>
    );
}

export default ObjectForm;
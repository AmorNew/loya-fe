import cn from 'classnames'
import { setOptions } from 'leaflet'
import React, { useEffect, useState } from 'react'
import { createDefaultMaskGenerator } from 'react-hook-mask'
import { useNavigate } from 'react-router-dom'
import Select, { SingleValue } from 'react-select'

import {
    selectUnitById,
    useCreateUnitMutation,
    useGetVehicleMakesQuery,
    useLazyGetVehicleMakesQuery,
    useLazyGetVehicleModelsQuery,
    useUpdateUnitMutation,
} from '../../../app/api/loyaBackendAPI'
import { useAppSelector } from '../../../app/hooks'

import { Group } from '../../../app/reducers/collectionsReducer'
import { selectCurrentObjectId } from '../../../app/reducers/dataReducer'
import Button from '../../ui/Button'
import Input from '../../ui/Input'
import GroupSelector from '../GroupSelector'
import ObjectCardWrapper from '../ObjectCardWrapper/intex'

import IconSelector from './components/IconSelector'
import styles from './ObjectForm.module.scss'

type Props = {
    mode?: 'new' | 'edit'
}

const MY_RULES = new Map([
    ['C', /[АВЕКМНОРСТУХABCKMHOPCTYX]/i],
    ['N', /\d/],
])

const formSchema = [
    {
        rowName: 'Название',
        props: { labelText: 'Название', name: 'visible_name' },
    },
    {
        rowName: 'Стиль иконки',
        props: { labelText: 'Стиль иконки', name: 'icon' },
    },
    { rowName: 'Марка', props: { labelText: 'Марка', name: 'make' } },
    { rowName: 'Модель', props: { labelText: 'Модель', name: 'model' } },
    {
        rowName: 'Гос. номер',
        props: {
            labelText: 'Гос. номер',
            name: 'license_plate',
            maskGenerator: {
                rules: MY_RULES,
                generateMask: (value: any) =>
                    (value?.replaceAll('-', '').length ?? 0) <= 8 ? 'C NNN CC NN' : 'C NNN CC NNN',
                transform: (v: any) => v?.toUpperCase(),
            },
        },
    },
    { rowName: 'Группа', props: { labelText: 'Группа', name: 'group_ids' } },
    { rowName: 'VIN', props: { labelText: 'VIN', name: 'vin' } },
    {
        rowName: 'Терминал мониторинга',
        props: {
            labelText: 'Терминал мониторинга',
            name: 'terminal',
            value: 'ЕГТС',
            disabled: true,
        },
    },
    {
        rowName: 'Уникальный ID',
        props: { labelText: 'Уникальный ID', name: 'hw_id' },
    },
    {
        rowName: 'Номер телефона 1',
        props: {
            labelText: 'Номер телефона 1',
            name: 'sim1',
            maskGenerator: createDefaultMaskGenerator('+7 (999) 999 99 99'),
        },
    },
    {
        rowName: 'Номер телефона 2',
        props: {
            labelText: 'Номер телефона 2',
            name: 'sim2',
            maskGenerator: createDefaultMaskGenerator('+7 (999) 999 99 99'),
        },
    },
]

const DEVICE_FIELDS = ['hw_id', 'sim1', 'sim2']

const VEHICLE_FIELDS = ['license_plate', 'make', 'model', 'vin']

const nameArr = ['group_ids', 'hw_id', 'icon', 'license_plate', 'make', 'model', 'visible_name', 'sim1', 'sim2', 'vin']

export interface MakeOption {
    readonly value: string
    readonly label: string
}

const Form = ({ mode, object = {} }: { mode: string; object?: any }) => {
    const [values, setValues] = useState<any>(
        formSchema.reduce((acc, item) => {
            if (item.props.name === 'group_ids') {
                const group_ids = object.groups?.map(({ id }: Group) => id)

                acc.group_ids = group_ids || item.props?.value || []
            } else {
                acc[String(item.props.name)] = object[item.props.name] || item.props?.value || ''
            }

            return acc
        }, {} as any),
    )
    const [errors, setErrors] = useState<any>({})

    const [makeOptions, setMakeOptions] = useState<any>([])
    const [modelOptions, setModelOptions] = useState<any>([])

    const [createTrigger, createResult] = useCreateUnitMutation()
    const [updateTrigger, updateResult] = useUpdateUnitMutation()

    const [modelsTrigger] = useLazyGetVehicleModelsQuery()

    const makes = useGetVehicleMakesQuery('')

    const navigate = useNavigate()

    useEffect(() => {
        if (makes.data?.result?.makes?.length) {
            const options = makes.data.result.makes.map((make: string): MakeOption => {
                return {
                    value: make,
                    label: make,
                }
            })

            setMakeOptions(options)
        }
    }, [makes])

    const handleSubmit = async (e: any) => {
        e.stopPropagation()
        e.preventDefault()

        if (mode === 'edit') {
            handleUpdate()
        } else if (mode === 'new') {
            handleCreate()
        }
    }

    const handleCreate = async () => {
        const { group_ids, hw_id, icon, license_plate, make, model, visible_name, sim1, sim2, vin } = values

        if (group_ids && hw_id && icon && license_plate && make && model && visible_name && sim1 && sim2 && vin) {
            createTrigger({
                device: {
                    id: 666,
                    hw_id,
                    vendor: '',
                    model: '',
                    protocol: 'egts',
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
                created_at: '',
                id: 0,
                updated_at: '',
                group_ids,
            }).then(({ data }: any) => {
                navigate(`/object/${data?.result?.id}`)
            })
        } else {
            const errors: any = {}

            nameArr.forEach((name: string) => {
                if (!values[name]) {
                    errors[name] = 'Поле обязательно для заполнения'
                }
            })

            setErrors(errors)
        }
    }

    const handleUpdate = async () => {
        const { id } = object

        const group_ids_from_object = object.groups?.map(({ id }: Group) => id) || []

        let needToUpdate = false
        const errors: any = {}

        const changedValues = nameArr.reduce(
            (acc: any, name) => {
                if (values[name] !== object[name]) {
                    if (
                        (name === 'group_ids' &&
                            !values.group_ids.every((v: number, i: number) => v === group_ids_from_object[i])) ||
                        name !== 'group_ids'
                    ) {
                        if (DEVICE_FIELDS.includes(name)) {
                            acc.device = acc.device || {}

                            acc.device[name] = values[name]
                        } else if (VEHICLE_FIELDS.includes(name)) {
                            acc.vehicle = acc.vehicle || {}

                            acc.vehicle[name] = values[name]
                        } else {
                            acc[name] = values[name]
                        }

                        needToUpdate = true
                    }

                    if (!values[name] && name !== 'group_ids') {
                        errors[name] = 'Поле обязательо для заполнения'
                    }
                }

                return acc
            },
            { id },
        )

        if (needToUpdate) {
            console.log(errors)

            if (Object.values(errors).length) {
                setErrors(errors)
            } else {
                updateTrigger(changedValues).then(() => navigate(`/object/${id}`))
            }
        } else {
            navigate(`/object/${id}`)
        }
    }

    return (
        <form
            className={cn(styles.form, {
                [styles.locked]: createResult.isLoading || updateResult.isLoading,
            })}
            onSubmit={handleSubmit}
        >
            {formSchema.map(({ rowName, props: { labelText, name, disabled, maskGenerator } }, index) => {
                if (name === 'icon') {
                    return (
                        <div key={`${name}-${index}`} className={styles.row}>
                            <div className={styles.name}>{rowName}</div>

                            <IconSelector
                                value={values[name]}
                                error={Boolean(errors[name])}
                                onIconClick={(value: string) => {
                                    if (value) {
                                        setErrors((prevErrors: any) => ({
                                            ...prevErrors,
                                            [name]: undefined,
                                        }))
                                    }

                                    setValues((prevValues: any) => ({
                                        ...prevValues,
                                        [name]: value,
                                    }))
                                }}
                            />
                        </div>
                    )
                }

                if (name === 'group_ids') {
                    return (
                        <div key={`${name}-${index}`} className={styles.row}>
                            <div className={styles.name}>{rowName}</div>

                            <GroupSelector
                                object={object}
                                creatable={false}
                                onChange={(value) => {
                                    setValues((prevValues: any) => ({
                                        ...prevValues,
                                        [name]: value,
                                    }))
                                }}
                            />
                        </div>
                    )
                }

                if (name === 'make') {
                    return (
                        <div key={`${name}-${index}`} className={styles.row}>
                            <div className={styles.name}>{rowName}</div>

                            <Select
                                hideSelectedOptions
                                options={makeOptions}
                                value={{
                                    value: values[name],
                                    label: values[name],
                                }}
                                onChange={(value: SingleValue<MakeOption>) => {
                                    if (value) {
                                        if (value.value !== values[name]) {
                                            setValues((prevValues: any) => ({
                                                ...prevValues,
                                                model: null,
                                            }))
                                        }

                                        setValues((prevValues: any) => ({
                                            ...prevValues,
                                            [name]: value.value,
                                        }))

                                        modelsTrigger({ make: value.value }).then((result) => {
                                            if (result.data?.result?.models) {
                                                const options = result.data.result.models.map(
                                                    (model: string): MakeOption => {
                                                        return {
                                                            value: model,
                                                            label: model,
                                                        }
                                                    },
                                                )

                                                setModelOptions(options)
                                            }
                                        })
                                    }
                                }}
                                classNames={{
                                    container: () => styles.container,
                                    control: (state) =>
                                        cn(styles.control, {
                                            [styles.focused]: state.isFocused,
                                        }),
                                    indicatorsContainer: () => styles.indicators,
                                    clearIndicator: () => styles.indicator,
                                    dropdownIndicator: () => styles.indicator,
                                    valueContainer: () => styles.valueContainer,
                                    placeholder: () => styles.placeholder,
                                    option: (props: any) =>
                                        cn(styles.option, {
                                            [styles.focused]: props.isFocused,
                                        }),
                                    singleValue: () => styles.singleValue,
                                }}
                            />
                        </div>
                    )
                }

                if (name === 'model') {
                    return (
                        <div key={`${name}-${index}`} className={styles.row}>
                            <div className={styles.name}>{rowName}</div>

                            <Select
                                hideSelectedOptions
                                options={modelOptions}
                                value={{
                                    value: values[name],
                                    label: values[name],
                                }}
                                onChange={(value: SingleValue<MakeOption>) => {
                                    if (value) {
                                        setValues((prevValues: any) => ({
                                            ...prevValues,
                                            [name]: value.value,
                                        }))
                                    }
                                }}
                                classNames={{
                                    container: () => styles.container,
                                    control: (state) =>
                                        cn(styles.control, {
                                            [styles.focused]: state.isFocused,
                                        }),
                                    indicatorsContainer: () => styles.indicators,
                                    clearIndicator: () => styles.indicator,
                                    dropdownIndicator: () => styles.indicator,
                                    valueContainer: () => styles.valueContainer,
                                    placeholder: () => styles.placeholder,
                                    option: (props: any) =>
                                        cn(styles.option, {
                                            [styles.focused]: props.isFocused,
                                        }),
                                    singleValue: () => styles.singleValue,
                                }}
                            />
                        </div>
                    )
                }

                return (
                    <div key={`${name}-${index}`} className={styles.row}>
                        <div className={styles.name}>{rowName}</div>

                        <Input
                            size='s'
                            disabled={disabled}
                            className={styles.input}
                            labelText={labelText}
                            name={name}
                            defaultValue={values[name]}
                            maskGenerator={maskGenerator}
                            error={Boolean(errors[name])}
                            errorText={errors[name]}
                            onChange={(value: any) => {
                                if (value) {
                                    setErrors((prevErrors: any) => ({
                                        ...prevErrors,
                                        [name]: undefined,
                                    }))
                                }

                                setValues((prevValues: any) => ({
                                    ...prevValues,
                                    [name]: value,
                                }))
                            }}
                        />
                    </div>
                )
            })}

            <div className={styles.buttonRow}>
                <Button
                    type='button'
                    buttonStyle='secondary'
                    shrink={true}
                    onClick={() => {
                        console.log('ГАЛЯ! У НАС ОТМЕНА!')
                        navigate(-1)
                    }}
                >
                    Отменить
                </Button>

                <Button type='submit' shrink={true}>
                    {mode === 'new' ? '+ Добавить новый объект' : 'Сохранить изменения'}
                </Button>
            </div>
        </form>
    )
}

const ObjectForm = ({ mode = 'new' }: Props) => {
    const currentObjectId = useAppSelector(selectCurrentObjectId)
    const currentObject = useAppSelector((state) => selectUnitById(state, currentObjectId))

    let object

    if (currentObject) {
        const {
            device: { hw_id, protocol, sim1, sim2 },
            icon,
            vehicle: { license_plate, make, model, vin },
            visible_name,
            id,
            groups,
        } = currentObject

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
            groups,
        }
    }

    return (
        <ObjectCardWrapper>
            <h2 className={cn(styles.title)}>{mode === 'new' ? 'Новый объект' : 'Редактирование объекта'}</h2>

            {mode === 'edit' && object && <Form mode={mode} object={object} />}
            {mode === 'new' && <Form mode={mode} />}
        </ObjectCardWrapper>
    )
}

export default ObjectForm

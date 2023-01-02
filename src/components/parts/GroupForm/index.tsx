import cn from 'classnames'
import { useState } from 'react'
import Select from 'react-select'

import { useCreateGroupMutation } from '../../../app/api/loyaBackendAPI'
import { Group } from '../../../app/reducers/collectionsReducer'
import Button from '../../ui/Button'
import Input from '../../ui/Input'

import styles from './GroupForm.module.scss'

export interface ColourOption {
    readonly type: number
    readonly value: string
    readonly label: string
    // readonly color: string;
    readonly isFixed?: boolean
    readonly isDisabled?: boolean
}

export const colourOptions: readonly ColourOption[] = [
    { type: 0, value: 'ocean', label: '' },
    { type: 1, value: 'blue', label: '' },
    { type: 2, value: 'purple', label: '' },
    { type: 3, value: 'red', label: '' },
    { type: 4, value: 'orange', label: '' },
    { type: 5, value: 'yellow', label: '' },
]

type Props = {
    newGroupName?: string
    onSubmit?: (group: Group) => void
}

const GroupForm = ({ newGroupName = '', onSubmit }: Props) => {
    const [groupName, setGroupName] = useState<string>(newGroupName)
    const [type, setType] = useState<number>(0)

    const [createTrigger, createResult] = useCreateGroupMutation()

    const handleSubmit = () => {
        createTrigger({
            name: groupName,
            type,
        }).then((res: any) => {
            if (onSubmit) {
                onSubmit({
                    id: res?.data?.result?.id,
                    type,
                    name: groupName,
                })
            }
        })
    }

    return (
        <div className={styles.root}>
            <h3 className={styles.header}>Создание новой группы</h3>

            <div className={styles.row}>
                <div className={styles.rowName}>Цвет</div>

                <Select
                    isSearchable={false}
                    options={colourOptions}
                    classNames={{
                        container: () => {
                            return cn({
                                [styles.container]: true,
                            })
                        },
                        control: (state) =>
                            cn({
                                [styles.control]: true,
                                [styles.focused]: state.isFocused,
                            }),

                        indicatorsContainer: () => {
                            return cn({
                                [styles.indicators]: true,
                            })
                        },
                        clearIndicator: () => {
                            return cn({
                                [styles.indicator]: true,
                            })
                        },
                        dropdownIndicator: () => {
                            return cn({
                                [styles.indicator]: true,
                            })
                        },
                        valueContainer: () => styles.valueContainer,
                        placeholder: () => styles.placeholder,
                        singleValue: (props) => {
                            return cn({
                                [styles[`type-${props.data.type}`]]: true,
                                [styles.singleValue]: true,
                            })
                        },
                        option: (props) => {
                            return cn({
                                [styles[`type-${props.data.type}`]]: true,
                                [styles.option]: true,
                                [styles.focused]: props.isFocused,
                            })
                        },
                    }}
                    defaultValue={{ type: 0, value: 'ocean', label: '' }}
                    onChange={(value) => {
                        if (value) {
                            setType(value.type)
                        }
                    }}
                />
            </div>

            <div className={styles.row}>
                <div className={styles.rowName}>Название</div>

                <Input
                    size='s'
                    className={styles.input}
                    defaultValue={groupName}
                    onChange={(value: string) => {
                        setGroupName(value)
                    }}
                />
            </div>

            <Button type='button' onClick={() => handleSubmit()}>
                Создать группу
            </Button>
        </div>
    )
}

export default GroupForm

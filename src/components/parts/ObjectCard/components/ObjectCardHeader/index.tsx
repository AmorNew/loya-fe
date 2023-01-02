import cn from 'classnames'
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import {
    selectUnitById,
    useDeleteUnitMutation,
    useUnlinkUnitGroupMutation,
} from '../../../../../app/api/loyaBackendAPI'
import { useAppSelector } from '../../../../../app/hooks'
import { selectCurrentObjectId } from '../../../../../app/reducers/dataReducer'
import Button from '../../../../ui/Button'
import Icon from '../../../../ui/Icon'
import Groups from '../../../Groups'
import LicensePlate from '../../../LicensePlate'

import Modal from '../../../Modal'
import { iconTypes } from '../../../ObjectForm/components/IconSelector'

import styles from './ObjectCardHeader.module.scss'

const ObjectCardHeader = () => {
    const [showModal, setShowModal] = useState<boolean>(false)

    const navigate = useNavigate()
    const [deleteTrigger] = useDeleteUnitMutation()
    const [unlinkTrigger] = useUnlinkUnitGroupMutation()

    const currentObjectId = useAppSelector(selectCurrentObjectId)
    const currentObject = useAppSelector((state) => selectUnitById(state, currentObjectId))

    if (!currentObject) {
        return null
    }

    const {
        id,
        groups,
        icon,
        visible_name,
        vehicle: { model, make, license_plate },
    } = currentObject

    const iconProps = iconTypes[icon]

    const handleGroupDelete = (groupId: number) => {
        unlinkTrigger({ groupId, unitId: id })
    }

    return (
        <div className={cn(styles.root)}>
            <div className={styles.icon} style={{ background: iconProps?.background }}>
                {iconProps && <Icon type={iconProps.icon} color={iconProps.color} size='l' />}
            </div>
            <div className={styles.summary}>
                <div className={styles.title}>{model}</div>

                <div className={styles.additionalInfo}>
                    <span className={styles.mark}>{make}</span>
                    <LicensePlate stringPlate={license_plate} />
                </div>

                <Groups groups={groups} onGroupDeleteClick={handleGroupDelete} />
            </div>
            <div className={styles.controls}>
                <Icon type='location' color='grey' onClick={() => navigate(`/map/${currentObjectId}`)} />
                <Icon type='edit' color='grey' onClick={() => navigate(`/object/${currentObjectId}/edit`)} />
                <Icon type='delete' color='grey' onClick={() => setShowModal(true)} />

                <Modal
                    show={showModal}
                    onClose={() => {
                        setShowModal(false)
                    }}
                >
                    <div className={styles.modal}>
                        Вы точно хотите удалить объект
                        <br />
                        {visible_name}?
                        <Button
                            className={styles.modalDeleteBtton}
                            onClick={() => {
                                deleteTrigger({ id: Number(currentObjectId) })
                                setShowModal(false)
                            }}
                        >
                            Удалить
                        </Button>
                        <Button
                            className={styles.modalCancelBtton}
                            buttonStyle='secondary'
                            onClick={() => setShowModal(false)}
                        >
                            Отменить
                        </Button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default ObjectCardHeader

import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useFilterGroupsQuery, useFilterUnitsQuery } from '../../../app/api/loyaBackendAPI'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectSearchParams, setCurrentObjectId } from '../../../app/reducers/dataReducer'
import Button from '../../ui/Button'
import ObjectItem from '../ObjectItem'

import ObjectListFilters from './components/ObjectListFilters'
import styles from './ObjectList.module.css'

type Props = {
    hideOnlineStatus?: boolean
    hideAddObjectButton?: boolean
}

const ObjectList = ({ hideOnlineStatus = false, hideAddObjectButton = false }: Props) => {
    const [search, setSearch] = useState<string>('')

    const searchParams = useAppSelector(selectSearchParams)

    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    let units = []

    const { data, isLoading, isSuccess, isError, error } = useFilterUnitsQuery(searchParams)

    useEffect(() => {
        const objectId = location.pathname.split('/')[2]

        dispatch(setCurrentObjectId(Number(objectId)))
    }, [location.pathname, dispatch])

    if (isSuccess && data) {
        units = data.result.units
    }

    let content

    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isSuccess) {
        content = units.map(({ id }: any) => <ObjectItem key={id} objectId={id} hideOnlineStatus={hideOnlineStatus} />)
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <div className={styles.root}>
            <ObjectListFilters />

            <div className={styles.listWrapper}>{content}</div>

            {!hideAddObjectButton && (
                <div className={styles.buttonWrapper}>
                    <Button onClick={() => navigate('/object/new')}>+ Добавить новый объект</Button>
                </div>
            )}
        </div>
    )
}

export default ObjectList

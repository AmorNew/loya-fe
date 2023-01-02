import cn from 'classnames'
import ru from 'date-fns/locale/ru'
import moment from 'moment'
import React, { forwardRef, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'

import 'moment/locale/ru'

import { useFilterUnitHistoryQuery } from '../../../../../app/api/loyaBackendAPI'
import { useAppSelector } from '../../../../../app/hooks'
import { selectCurrentObjectId } from '../../../../../app/reducers/dataReducer'
import Button from '../../../../ui/Button'
import Icon from '../../../../ui/Icon'

import HistoryCategoryList from './components/HistoryCategoryList'
import HistoryList from './components/HistoryList'

import 'react-datepicker/dist/react-datepicker.css'
import './datepicker.css'
import styles from './ObjectCardHistory.module.scss'

registerLocale('ru', ru)

const ObjectCardHistory = ({ state }: any) => {
    // const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([new Date(), new Date()]);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
    const [category, setCategory] = useState<string | null>(null)

    const [startDate, endDate] = dateRange

    const unit_id = useAppSelector(selectCurrentObjectId)

    const history = useFilterUnitHistoryQuery({
        unit_id,
        category,
        created_from: startDate && moment(startDate).format(),
        created_to: endDate && moment(endDate).format(),
    })

    const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
        <div className={styles.datePickerButton} onClick={onClick} ref={ref}>
            {value ? value : 'Период'}

            <Icon type={'arrow-down'} color='grey' />
        </div>
    ))

    return (
        <div className={cn(styles.root)}>
            <DatePicker
                wrapperClassName={styles.datePickerWrapper}
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                    setDateRange(update)
                }}
                dateFormat='dd.MM.yyyy'
                locale='ru'
                customInput={<ExampleCustomInput />}
                popperPlacement='bottom-end'
            />

            <HistoryCategoryList
                category={category}
                onCategoryClick={(newCategory) => {
                    setCategory(newCategory)
                }}
            />

            <HistoryList history={history?.data?.result?.history || []} />
        </div>
    )
}

export default ObjectCardHistory

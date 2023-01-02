import cn from 'classnames'
import React from 'react'

import styles from './HistoryCategoryList.module.scss'

type HistoryCategory = {
    name: string
    value: string | null
}

const HISTORY_CATEGORY_LIST: HistoryCategory[] = [
    {
        name: 'Все',
        value: null,
    },
    {
        name: 'Настройки',
        value: 'settings',
    },
    {
        name: 'Вход / выход',
        value: 'in-out',
    },
    {
        name: 'Превышения',
        value: 'speeding',
    },
    {
        name: 'Торможения',
        value: 'braking',
    },
    {
        name: 'Заправки / сливы',
        value: 'refueling-draining',
    },
]

type Props = {
    category: null | string
    onCategoryClick: (category: string | null) => void
}

const HistoryCategoryList = ({ category, onCategoryClick }: Props) => {
    return (
        <div className={cn(styles.root)}>
            {HISTORY_CATEGORY_LIST.map(({ name, value }: HistoryCategory) => {
                return (
                    <div
                        key={value}
                        onClick={() => onCategoryClick(value)}
                        className={cn({
                            [styles.chips]: true,
                            [styles.current]: value === category,
                        })}
                    >
                        {name}
                    </div>
                )
            })}
        </div>
    )
}

export default HistoryCategoryList

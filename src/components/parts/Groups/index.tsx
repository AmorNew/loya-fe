import { Group as GroupType } from '../../../app/reducers/collectionsReducer'

import Group from './components/Group'

import styles from './Groups.module.scss'

type Props = {
    // unitId: number,
    groups: GroupType[]
    onGroupDeleteClick?: (groupId: number) => void
}

const Groups = ({ groups = [], onGroupDeleteClick }: Props) => {
    const handleDeleteClick = (groupId: number) => {
        onGroupDeleteClick && onGroupDeleteClick(groupId)
    }

    return (
        <div className={styles.root}>
            {groups &&
                groups.map(({ id, name, type }) => {
                    return (
                        <Group key={`group-${id}`} id={id} name={name} type={type} onDeleteClick={handleDeleteClick} />
                    )
                })}
        </div>
    )
}

export default Groups

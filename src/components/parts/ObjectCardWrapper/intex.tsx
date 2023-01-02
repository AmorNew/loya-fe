import cn from 'classnames'
import React from 'react'

import styles from './ObjectCardWrapper.module.css'

const ObjectCardWrapper = ({ children }: { children: React.ReactNode }) => {
    return <div className={cn(styles.root)}>{children}</div>
}

export default ObjectCardWrapper

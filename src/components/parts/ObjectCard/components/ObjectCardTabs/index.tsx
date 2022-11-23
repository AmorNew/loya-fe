import React from "react";
import cn from 'classnames';

import styles from './ObjectCardTabs.module.css';


const ObjectCardTabs = ({currentTabId, tabs, setCurrentTab}: any) => {
    return (
        <div className={cn(styles.root)}>
            {tabs.map(({id, name}: {id: string, name: string}) => (
                <div 
                    key={id} 
                    className={cn(styles.tab, {[styles.current]: id === currentTabId})}
                    onClick={() => setCurrentTab(id)}
                >
                    {name}
                </div>
            ))}
        </div>
    );
}

export default ObjectCardTabs;
import cn from 'classnames'

import { ReactComponent as LogoIcon } from './logo-icon.svg'

import './styles.css'

const Logo = ({ className }: any) => {
    return (
        <i className={cn('logo-icon', className)}>
            <LogoIcon />
        </i>
    )
}

export default Logo

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TAB_SWITCH } from '../../services/actions/cart'
import styles from './tab.module.css'

export const Tab = ({ text, active, onClick: handleClick, value }) => {
    const dispatcher = useDispatch()

    const switchTab = () => {
        dispatcher({ type: TAB_SWITCH })
    }
    const className = `${styles.tab} ${active ? styles.tab_type_current : ''}`
    return (
        <div className={`${className}`} onClick={switchTab}>
            {text}
        </div>
    )
}

import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CANCEL_PROMO } from '../../services/actions/cart'
import styles from './promo-button.module.css'
import closeIcon from '../../images/close.svg'

export function PromoButton({ children, extraClass }) {
    const dispatch = useDispatch()
    //  Воспользуемся хуком useDispatсh и экшеном CANCEL_PROMO для сброса промокода.
    // После этого нужно избавиться от PromoContext в приложении.

    const cancelPromo = () => {
        dispatch({ type: CANCEL_PROMO })
    }

    return (
        <button type="button" className={`${styles.button} ${extraClass}`} onClick={cancelPromo}>
            {children}
            <img className={styles.close} src={closeIcon} alt="кнопка закрытия" />
        </button>
    )
}

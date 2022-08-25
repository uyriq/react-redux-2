import React, { useContext } from 'react'
import styles from './total-price.module.css'
import { useSelector, useDispatch } from 'react-redux'

export const TotalPrice = ({ extraClass }) => {
    // state => state.cart.items.
    const totalPrice = useSelector((store) => store.cart.items.reduce((acc, item) => acc + item.price * item.qty, 0))
    const discount = useSelector((store) => store.cart.promoDiscount)
    return (
        <div className={`${styles.container} ${extraClass}`}>
            <p className={styles.text}>Итого:</p>
            <p className={styles.cost}>{`${(totalPrice - totalPrice * (discount / 100)).toFixed(0)} руб.`}</p>
        </div>
    )
}

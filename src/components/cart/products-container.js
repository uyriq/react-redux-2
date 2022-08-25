import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { applyPromoCodeRequest, getItemsRequest } from '../../services/fakeApi'
import styles from './products-container.module.css'
import { Product } from './product'
import { Input } from '../../ui/input/input'
import { MainButton } from '../../ui/main-button/main-button'
import { PromoButton } from '../../ui/promo-button/promo-button'
import { Loader } from '../../ui/loader/loader'

export const ProductsContainer = () => {
    const totalPrice = useSelector((store) => store.cart.items.reduce((acc, item) => acc + item.price * item.qty, 0))
    const discount = useSelector((store) => store.cart.promoDiscount)
    //   Присвойте результат работы ещё одного хука useSelector переменной discount.
    // Она должна ссылаться на значение promoDiscount из ключа хранилища cart.
    const promo = useSelector((store) => store.cart.promoCode)
    const promoCode = useSelector((store) => store.cart.promoCode)
    const items = useSelector((store) => store.cart.items)

    const [itemsRequest, setItemsRequest] = useState(false)
    const [promoFailed, setPromoFailed] = useState(false)
    const [promoRequest, setPromoRequest] = useState(false)

    const inputRef = useRef(null)

    useEffect(() => {
        setItemsRequest(true)
        getItemsRequest()
            .then((res) => {
                if (res && res.success) {
                    console.log(res)
                    setItemsRequest(false)
                }
            })
            .catch((err) => {
                console.log(err)
                setItemsRequest(false)
            })
    }, [])

    const applyPromoCode = useCallback(() => {
        const inputValue = inputRef.current.value
        setPromoRequest(true)
        applyPromoCodeRequest(inputValue)
            .then((res) => {
                if (res && res.success) {
                    setPromoRequest(false)
                    setPromoFailed(false)
                } else {
                    setPromoFailed(true)
                    setPromoRequest(false)
                }
            })
            .catch((err) => {
                console.log(err)
                setPromoRequest(false)
            })
    }, [discount])

    const content = useMemo(() => {
        return itemsRequest ? (
            <Loader size="large" />
        ) : (
            items.map((item, index) => {
                return <Product key={index} {...item} />
            })
        )
    }, [itemsRequest, items])

    const promoCodeStatus = useMemo(() => {
        return promoFailed ? (
            <p className={styles.text}>Произошла ошибка! Проверьте корректность введенного промокода</p>
        ) : promoRequest ? (
            ''
        ) : promo ? (
            <p className={styles.text}>Промокод успешно применён!</p>
        ) : (
            ''
        )
    }, [promoRequest, promo, promoFailed])

    return (
        <div className={`${styles.container}`}>
            {content}
            <div className={styles.promo}>
                <div className={styles.inputWithBtn}>
                    <Input
                        type="text"
                        placeholder="Введите промокод"
                        extraClass={styles.input}
                        inputWithBtn={true}
                        inputRef={inputRef}
                    />
                    <MainButton
                        type="button"
                        extraClass={styles.promo_button}
                        inputButton={true}
                        onClick={applyPromoCode}
                    >
                        {promoRequest ? <Loader size="small" inverse={true} /> : 'Применить'}
                    </MainButton>
                </div>
                {promo && <PromoButton extraClass={styles.promocode}>{promo}</PromoButton>}
            </div>
            {promoCodeStatus}
        </div>
    )
}

import React from 'react'
import styles from './Checkout.module.css'
import check from '../../assets/check.svg'

const Checkout = ({ name }) => {
    return (
        <div className={styles.checkoutContainer}>
            <div>
                <img src={check} alt="check" />
            </div>
            <div>
                <h2>Thank you for the Booking</h2>
                <p>Soon you will recieve the call from {name} our real estate agent</p>
            </div>
        </div>
    )
}

export default Checkout
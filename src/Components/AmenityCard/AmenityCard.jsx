import React from 'react'
import styles from './AmenityCard.module.css'

const AmenityCard = ({ imgPath, amenityName }) => {
    return (

        <div className={styles.amenityCard}>
            <div className={styles.imgContainer}>
                <img src={imgPath} alt={amenityName} />
            </div>
            <div className={styles.textContainer}>
                <h3>{amenityName}</h3>
            </div>
        </div>

    )
}

export default AmenityCard
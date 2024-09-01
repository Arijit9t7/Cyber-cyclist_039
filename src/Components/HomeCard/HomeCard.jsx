import React from 'react'
import styles from './HomeCard.module.css'

const HomeCard = ({ imgPath, locationName, height, width }) => {
    return (
        <div className={styles.homecard} style={{ height: `${height}`, width: `${width}` }}>
            <div className={styles.imgContainer}>
                <img src={imgPath} alt={locationName} />
            </div>
            {/* <div className={styles.textContainer}>
                <h3>{locationName}</h3>
            </div> */}
        </div>
    )
}

export default HomeCard
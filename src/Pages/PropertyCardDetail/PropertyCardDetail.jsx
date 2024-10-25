import React, { useEffect, useState } from 'react'
import styles from './PropertyCardDetail.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import CardDetail from '../../Components/CardDetails/CardDetail'


const PropertyCardDetail = () => {

    const { id } = useParams()

    let newid = id - 1
    const [property, setProperty] = useState()
    const propertyUrl = `https://heavenhome-66467-default-rtdb.asia-southeast1.firebasedatabase.app/properties/${newid}.json`

    const fetchData = async () => {

        try {
            const response = await axios.get(propertyUrl);
            setProperty(response.data);
        } catch (error) {
            console.error('Error fetching property:', error);
        }
    }


    useEffect(() => {
        fetchData()
    }, [])


    return (

        <div className={styles.PropertyCardDetailContainer}>
            {property ? (
                <CardDetail key={property.id} property={property} />
            ) : (
                <p>Loading property details...</p>
            )}
        </div>

    )
}

export default PropertyCardDetail
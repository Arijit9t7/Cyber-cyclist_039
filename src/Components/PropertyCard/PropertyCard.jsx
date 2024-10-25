import React from 'react'
import styles from './PropertyCard.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Pagination,  Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext.jsx'
import { toast } from 'react-hot-toast';


const PropertyCard = ({ property }) => {

    const navigate = useNavigate()

    const { isLoggedIn, admin } = useAuth();

    const handlePropertyCardDetails = (id) => {
        if (isLoggedIn || admin) {
            toast.success("Redirecting to Property Details")
            navigate(`/propertycard/${id}`)
        }
        else {
            toast.error("Please Login to view Property Details")
            navigate(`/login`)
        }
    }


    return (
        <div className={styles.HomeListingCard} onClick={() => handlePropertyCardDetails(property.Uu_id)}>
            <Swiper
               
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
              
                onSlideChange={() => console.log('slide change')}
            >
                <SwiperSlide>
                    <img src={property.photos[0]} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={property.photos[1]} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={property.photos[2]} alt="" />
                </SwiperSlide>
            </Swiper>
            <div className={styles.detailContainer}>
                <p>{property.title}</p>
                <h2>₹{property.price}</h2>
                <h5>{property.description}</h5>
                <hr />
                <div className={styles.amenities}>
                    {
                        property.amenities.map((amenity, index) => {
                            return (
                                <div key={index} className={styles.amenity}>
                                    <span>{amenity}</span>
                                </div>
                            )
                        })
                    }
                </div>
                {/* <hr /> */}
            </div>
        </div>
    )
}


{/* <div className={styles.agentContainer}>
<div className={styles.imageName}>
    <img src={property.agentImage} alt="" />
    <b>{property.agentName}</b>
</div>
<div>
    <span> <b> Email:</b> {property.agentEmail}</span>
    <span> <b> Phone No.</b> {property.agentPhone}</span>
</div>
</div> */}

export default PropertyCard
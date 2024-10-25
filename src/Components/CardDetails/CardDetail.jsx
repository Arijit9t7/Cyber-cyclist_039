import React, { useEffect, useState } from 'react'
import classes from './CardDetail.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Pagination,  Navigation } from 'swiper/modules';
import amenityImage from '../../assets/appliance.png'
import Checkout from '../Checkout/Checkout';
import toast from 'react-hot-toast';


const CardDetail = ({ property }) => {

    const { Uu_id } = property;

    const [show, setShow] = useState(() => {
        const savedShow = localStorage.getItem(`show_${Uu_id}`);
        return savedShow ? JSON.parse(savedShow) : false;
    });

    const showCheckout = () => {
        if (!show) {
            toast.success("Booking in Progress");
        }

        setTimeout(() => {
            if (!show) {
                setShow(true);
                localStorage.setItem(`show_${Uu_id}`, JSON.stringify(true));
            }
        }, 3000);
    };

    useEffect(() => {
     
        localStorage.setItem(`show_${Uu_id}`, JSON.stringify(show));
    }, [show, Uu_id]);


    return (
        <div className={classes.CardDetailContainer}>
            <Swiper
          
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={2}
                navigation
            
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
            <section className={classes.CardDetailSection}>

                <div className={classes.CardDetailContainerDetail}>
                    <p>{property.title}</p>
                    <h2>₹{property.price} <span style={{
                        color: 'gray',
                        fontWeight: 'normal',
                        fontSize: '20px'
                    }}> /per month </span></h2>
                    <span>{property.description}</span>
                    <div className={classes.location}>
                        <img src="https://cdn.icon-icons.com/icons2/2642/PNG/96/google_map_location_logo_icon_159350.png" alt="" />
                        <span> {property.location}</span>
                    </div>
                    <hr />
                    <div className={classes.amenities}>
                        <div>
                            <img src={amenityImage} alt="" />
                            <h4>Amenities</h4>
                        </div>
                        {
                            property.amenities.map((amenity, index) => {
                                return (
                                    <div key={index} className={classes.amenity}>
                                        <span>✅ {amenity}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <hr />
                    <div className={classes.CardDetailContainerAgentData}>
                        <div className={classes.imageName}>
                            <b>{property.agentName}</b>
                            <span> <b> Email:</b> {property.agentEmail}</span>
                            <span> <b> Phone No.</b> {property.agentPhone}</span>
                        </div>
                    </div>
                </div>

                <div className={classes.booking}>

                    <div className={classes.checkout}>
                        <span>₹{property.price}</span> <span>+512 taxes</span>
                        <p>Agent Name : {property.agentName}</p>
                        <hr />
                        <p>Total Price: ₹{Number(property.price) + 512}</p>
                        <button onClick={showCheckout} >
                            {show ? "Booked" : "Book Now"}
                        </button>

                    </div>

                    <div>
                        {
                            show && <Checkout name={property.agentName} />
                        }
                    </div>

                </div>

            </section>
        </div>
    )
}

export default CardDetail
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Pagination,  Navigation } from 'swiper/modules';
import styles from './HomeListing.module.css'

const HomeListing = () => {

    const propertiesData = [
        {
            "id": 1,
            "title": "Single Room in Bellandur",
            "description": "A single room accommodation in a shared apartment in Bellandur.",
            "price": 5000,
            "location": "Bellandur",
            "amenities": ["WiFi", "Housekeeping", "Meals"],
            "photos": [
                "https://images.oyoroomscdn.com/uploads/hotel_image/40154/large/trlbamuvbcwl.jpg",
                "https://images.oyoroomscdn.com/uploads/hotel_image/40154/large/iihforcjaapx.jpg",
                "https://images.oyoroomscdn.com/uploads/hotel_image/40154/large/iuafwbhfuolq.jpg",
                "https://images.oyoroomscdn.com/uploads/hotel_image/40154/large/sushpvoomare.jpg",
                "https://images.oyoroomscdn.com/uploads/hotel_image/40154/large/isnochhgvbmq.jpg"
            ],
            "agentImage" : "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fHww",
            "agentName": "Rohit Kapoor",
            "agentEmail": "rohit.kapoor@gmail.com",
            "agentPhone": "+91-9876543227"
        },
        {
            "id": 2,
            "title": "3BHK Apartment in Marathahalli",
            "description": "A well-furnished 3BHK apartment in Marathahalli.",
            "price": 22000,
            "location": "Marathahalli",
            "amenities": ["WiFi", "Gym", "Parking"],
            "photos": ["https://www.ecolifedevelopers.com/images/aarial3.jpg",
                "https://images.oyoroomscdn.com/uploads/hotel_image/235096/large/xlojoipoggnx.jpg",
                "https://images.oyoroomscdn.com/uploads/hotel_image/235096/large/pcfpqjpyploe.jpg",
                "https://images.oyoroomscdn.com/uploads/hotel_image/235096/large/hmpgtcahlrna.jpg",
                "https://images.oyoroomscdn.com/uploads/hotel_image/235096/large/mxktnhukqbmj.jpg"
            ],
            "agentImage" : "https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
            "agentName": "Seema Arora",
            "agentEmail": "seema.arora@gmail.com",
            "agentPhone": "+91-9876543228"
        },
        {
            "id": 3,
            "title": "Penthouse in Sarjapur",
            "description": "A luxurious penthouse with a stunning view in Sarjapur.",
            "price": 40000,
            "location": "Sarjapur",
            "amenities": ["WiFi", "Swimming Pool", "Gym"],
            "photos": [
                "https://images.oyoroomscdn.com/uploads/hotel_image/227295/large/opachurqdjha.jpg",
                "https://images.oyoroomscdn.com/uploads/hotel_image/227295/large/leiscjubxenv.jpg",
                "https://images.oyoroomscdn.com/uploads/hotel_image/227295/large/wgphxvwpsixa.jpg",
                "https://images.oyoroomscdn.com/uploads/hotel_image/227295/large/wgphxvwpsixa.jpg",
                "https://images.oyoroomscdn.com/uploads/hotel_image/227295/large/hdosgbruaoom.jpg"
            ],
            "agentImage" : "https://images.unsplash.com/photo-1521566652839-697aa473761a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
            "agentName": "Kajal Tiwari",
            "agentEmail": "kajal.tiwari@gmail.com",
            "agentPhone": "+91-9876543229"
        },
    ]


    return (
        <>
            {
                propertiesData.map((property, index) => {
                    return (
                        <div className={styles.HomeListingCard} key={index}>
                            <Swiper
                                // install Swiper modules
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
                                <SwiperSlide>
                                    <img src={property.photos[3]} alt="" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={property.photos[4]} alt="" />
                                </SwiperSlide>
                            </Swiper>
                            <div className={styles.detailContainer}>
                                <p>{property.title}</p>
                                <h2>₹{property.price}</h2>
                                <span>{property.description}</span>
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
                                <hr />
                                <div className={styles.agentContainer}>
                                    <div className={styles.imageName}>
                                        <img src={property.agentImage} alt="" />
                                        <b>{property.agentName}</b>
                                    </div>
                                    <div>
                                        <span> <b> Email:</b> {property.agentEmail}</span>
                                        <span> <b> Phone No.</b> {property.agentPhone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default HomeListing
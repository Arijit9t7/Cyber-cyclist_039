import React from "react";
import styles from "./Home.module.css";
;
import HomeCard from "../../Components/HomeCard/HomeCard";
import img1 from "../../assets/homepage/img1.jpg";
import img2 from "../../assets/homepage/img2.jpg";
import img3 from "../../assets/homepage/img3.jpg";
import img4 from "../../assets/homepage/img4.jpg";
import img5 from "../../assets/homepage/img5.jpg";
import img6 from "../../assets/homepage/img6.jpg";
import AmenityCard from "../../Components/AmenityCard/AmenityCard";
import HomeListing from "../../Components/HomeListing/HomeListing";
import { Link } from "react-router-dom";


const amenitiesData = [
    {
        amenityName: 'Swimming Pool',
        imgPath: 'https://cdn.icon-icons.com/icons2/1369/PNG/96/-pool_90362.png',
    },
    {
        amenityName: 'Gym',
        imgPath: 'https://cdn.icon-icons.com/icons2/875/PNG/96/one-dumbbell_icon-icons.com_68167.png',
    },
    {
        amenityName: 'Parking',
        imgPath: 'https://cdn.icon-icons.com/icons2/1309/PNG/96/parking_86279.png',
    },
    {
        amenityName: 'Private security',
        imgPath: 'https://cdn.icon-icons.com/icons2/2783/PNG/96/verified_shield_protected_secure_security_icon_177173.png',
    },
    {
        amenityName: 'King Size Bed',
        imgPath: 'https://cdn.icon-icons.com/icons2/2248/PNG/96/bed_king_icon_137885.png'
    },
    {
        amenityName: 'Medical Center',
        imgPath: 'https://cdn.icon-icons.com/icons2/3852/PNG/96/medical_icon_236661.png'
    },
    {
        amenityName: 'Wifi',
        imgPath: 'https://cdn.icon-icons.com/icons2/614/PNG/96/wifi-medium-signal-symbol-1_icon-icons.com_56451.png'
    },
    {
        amenityName: 'Library',
        imgPath: 'https://cdn.icon-icons.com/icons2/2346/PNG/96/books_library_icon_142908.png'
    },
    {
        amenityName: 'Cafeteria',
        imgPath: 'https://cdn.icon-icons.com/icons2/1369/PNG/96/-local-cafe_90185.png'
    },
    {
        amenityName: 'Hair Dryer',
        imgPath: 'https://cdn.icon-icons.com/icons2/2248/PNG/96/hair_dryer_icon_135530.png'
    }

]


const Home = () => {
    return (
        <>

            <main className={styles.main}>
                <div className={styles.heading}>
                    <h1>Welcome to Havenhomes 🏠</h1>
                </div>
                <div className={styles.mainContent}>
                    <div className={styles.mainText}>
                        <h2>Find Your Dream</h2>
                        <h2> Location With Us</h2>
                        <p>
                            Discover the perfect place to call home with our comprehensive real
                            estate listings and expert guidance.
                        </p>
                        <h5 className={styles.getstarted}>
                        <Link to='/properties'>
                            <button>
                                Get Started
                            </button>
                        </Link>
                        </h5>
                        
                    </div>
                    <div className={styles.bentoGrid}>

                        <div className={styles.left}>
                            <div>
                                <HomeCard imgPath={img1} locationName='Delhi' height='350px' width='250px' />
                            </div>
                            <div>
                                <HomeCard imgPath={img2} locationName='Jaipur' height='150px' width='250px' />

                            </div>
                        </div>

                        <div className={styles.right}>
                            <div className={styles.rightUpper}>
                                <HomeCard imgPath={img3} locationName='Banglore' height='150px' width='400px' />
                            </div>
                            <div className={styles.rightDown}>
                                <div className={styles.rightDown1}>
                                    <HomeCard imgPath={img4} locationName='Mumbai' height='350px' width='200px' />
                                </div>
                                <div className={styles.rightDown2}>
                                    <div>
                                        <HomeCard imgPath={img5} locationName='Goa' height='165px' width='180px' />
                                    </div>
                                    <div>

                                        <HomeCard imgPath={img6} locationName='Pune' height='165px' width='180px' />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <section className={styles.HomeListingSection}>
                <div className={styles.HomeListingTextContainer}>
                    <h3>Featured Listings</h3>
                    <p> Explore our most <b> <i> popular</i></b> properties</p>
                </div>
                <div className={styles.HomeListingCardContainer}>
                    <HomeListing />
                </div>
            </section>

            <section className={styles.amenitiesSection}>
                <div className={styles.amenitiesTextContainer}>
                    <h3>
                        Our Amenities
                    </h3>
                    <p>Building Amenities</p>
                </div>

                <div className={styles.amenitiesCardContainer}>

                    {
                        amenitiesData.map((amenity, index) => (
                            <AmenityCard key={index} imgPath={amenity.imgPath} amenityName={amenity.amenityName} />
                        ))
                    }
                </div>

            </section>


        </>
    );
};

export default Home;

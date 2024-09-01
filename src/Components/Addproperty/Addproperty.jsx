import React, { useState } from 'react'
import styles from './Addproperty.module.css'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

const Addproperty = () => {

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [amenities, setAmenities] = useState('');
    const [photos, setPhotos] = useState('');
    const [agentName, setAgentName] = useState('');
    const [agentEmail, setAgentEmail] = useState('');
    const [agentPhone, setAgentPhone] = useState('');
    const [status, setStatus] = useState('');

    const { setRerender } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        const propertyData = {
            Uu_id: id,
            title,
            description,
            location,
            price: Number(price),
            amenities: amenities.split(',').map(item => item.trim()),
            photos: photos.split(',').map(item => item.trim()),
            agentName,
            agentEmail,
            agentPhone,
        };

        const apiUrl = 'https://heavenhome-66467-default-rtdb.asia-southeast1.firebasedatabase.app/properties.json';

        axios
            .post(apiUrl, propertyData)
            .then(() => {
                setStatus('Property added successfully!');
                setRerender((prev) => !prev);
                // Reset form fields
                setId('');
                setTitle('');
                setDescription('');
                setLocation('');
                setPrice('');
                setAmenities('');
                setPhotos('');
                setAgentName('');
                setAgentEmail('');
                setAgentPhone('');
                toast.success('Property added successfully!');
            })
            .catch((error) => {
                setStatus('Error adding property. Please try again later.');
                console.error('Error:', error);
                toast.error('Error adding property. Please try again later.');
            });
    };


    return (
        <div className={styles.AddpropertyForm}>
            <div>
                <h4>Add New Property</h4>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                {/* <input
                    type="text"
                    placeholder="Enter ID "
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                    className={styles.input}
                /> */}
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className={styles.input}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className={styles.textarea}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Amenities (comma separated)"
                    value={amenities}
                    onChange={(e) => setAmenities(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Photos URLs (comma separated)"
                    value={photos}
                    onChange={(e) => setPhotos(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Agent Name"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="email"
                    placeholder="Agent Email"
                    value={agentEmail}
                    onChange={(e) => setAgentEmail(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Agent Phone"
                    value={agentPhone}
                    onChange={(e) => setAgentPhone(e.target.value)}
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>
                    Add Property
                </button>
                {/* <div className={styles.status}>{status}</div> */}
            </form>
        </div>
    )
}

export default Addproperty
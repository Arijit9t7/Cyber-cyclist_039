import React, { useState } from 'react';
import axios from 'axios';
import styles from './EditProperty.module.css';
import toast from 'react-hot-toast';

const EditProperty = ({ property, propertyKey, onClose , fetchProperties }) => {
    const [title, setTitle] = useState(property.title);
    const [description, setDescription] = useState(property.description);
    const [price, setPrice] = useState(property.price);
    // Add other fields as needed

    const handleSave = async () => {
        try {
            await axios.put(`https://heavenhome-66467-default-rtdb.asia-southeast1.firebasedatabase.app/properties/${propertyKey}.json`, {
                ...property,
                title,
                description,
                price,
              
            });
            toast.success('Property updated successfully!');
            fetchProperties();
            onClose(); // Close the edit form after saving
        } catch (error) {
            console.error('Error updating property:', error);
            toast.error('Failed to update property');
        }
    };

    return (
        <div className={styles.editForm}>
            <label>
                Title:
            </label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <label>
                Description:
            </label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            <label>
                Price:
            </label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} />
          
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default EditProperty;

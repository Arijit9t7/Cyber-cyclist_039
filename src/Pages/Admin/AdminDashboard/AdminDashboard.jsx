import React, { useEffect, useState } from 'react'
import styles from './AdminDashboard.module.css'

import EditProperty from '../../../Components/EditProperty/EditProperty'
import { useAuth } from '../../../Context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {

    const { rerender } = useAuth()

    const [properties, setProperties] = useState({});
    const [editingProperty, setEditingProperty] = useState(null);
    const [editingKey, setEditingKey] = useState(null); 
    const fetchProperties = async () => {
        try {
            const response = await axios.get(
                "https://heavenhome-66467-default-rtdb.asia-southeast1.firebasedatabase.app/properties.json"
            );

            let filteredProperties = response.data;
            setProperties(filteredProperties);

        }
        catch (error) {
            console.error('Error fetching properties:', error);
        }
    }
    const handleEdit = (key) => {
        setEditingProperty(properties[key]); 
        setEditingKey(key); // Store the key of the property being edited
    };

    const handleDelete = async (key) => {
        try {
            await axios.delete(`https://heavenhome-66467-default-rtdb.asia-southeast1.firebasedatabase.app/properties/${key}.json`);
            const updatedProperties = { ...properties };
            delete updatedProperties[key]; // Remove the deleted property from the local state
            setProperties(updatedProperties);
            toast.success('Property deleted successfully!');
            fetchProperties();
        } catch (error) {
            console.error('Error deleting property:', error);
            toast.error('Failed to delete property');
        }
    };

    useEffect(() => {

        fetchProperties();
    }, [rerender]);

    return (
        <div className={styles.admincontainer}>

            <div className={styles.Addpropertybtn}>
                <Link to='/admin-dashboard/add-property'>
                    Add Property
                </Link>
            </div>



            {
                Object.entries(properties).map(([key, property]) => (
                    <div key={key} className={styles.show}>
                        <span>{key}.</span>
                        <h2>{property.title}</h2>
                        <p>₹{property.price}</p>
                        <img src={property.photos[0]} alt={property.title} />
                        <div className={styles.buttons}>
                            <button onClick={() => handleEdit(key)}>Edit</button>
                            <button onClick={() => handleDelete(key)}>Delete</button>
                        </div>

                    </div>
                ))
            }

            {editingProperty && (
                <div className={styles.editForm}>
                    <h2>Edit Property: {editingProperty.title}</h2>
                    <EditProperty
                        key={editingKey}
                        property={editingProperty}
                        propertyKey={editingKey} // Pass the key to the EditProperty component
                        onClose={() => {
                            setEditingProperty(null);
                            setEditingKey(null);
                        }}

                        fetchProperties={fetchProperties}
                    />
                </div>
            )}


        </div>
    )
}

export default AdminDashboard
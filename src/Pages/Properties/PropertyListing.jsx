import React, { useState, useEffect, useCallback } from 'react';
import styles from './PropertyListing.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropertyCard from '../../Components/PropertyCard/PropertyCard';
import { useAuth } from '../../Context/AuthContext';

const PropertyListing = () => {
    const { category } = useParams();
    const { rerender } = useAuth();

    const [properties, setProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState(sessionStorage.getItem('searchTerm') || "");
    const [selectedBhk, setSelectedBhk] = useState(sessionStorage.getItem('selectedBhk') || "");
    const [selectedLocation, setSelectedLocation] = useState(sessionStorage.getItem('selectedLocation') || "");
    const [sortOrder, setSortOrder] = useState(sessionStorage.getItem('sortOrder') || "default");

    const [suggestions, setSuggestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [propertiesPerPage] = useState(9);

    // Debounce function to delay the search execution
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    // Fetch properties when the component mounts or filters change
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(
                    "https://heavenhome-66467-default-rtdb.asia-southeast1.firebasedatabase.app/properties.json"
                );
                let filteredProperties = Object.values(response.data);

                if (selectedBhk) {
                    filteredProperties = filteredProperties.filter((property) =>
                        property.description.toLowerCase().includes(selectedBhk)
                    );
                }

                if (selectedLocation) {
                    filteredProperties = filteredProperties.filter((property) =>
                        property.location.toLowerCase().includes(selectedLocation)
                    );
                }

                if (searchTerm) {
                    filteredProperties = filteredProperties.filter((property) =>
                        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        property.amenities.some((amenity) =>
                            amenity.toLowerCase().includes(searchTerm.toLowerCase())
                        ) ||
                        property.agentName.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }

                if (sortOrder === "asc") {
                    filteredProperties.sort((a, b) => a.price - b.price);
                } else if (sortOrder === "desc") {
                    filteredProperties.sort((a, b) => b.price - a.price);
                }

                setProperties(filteredProperties);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, [category, searchTerm, selectedBhk, selectedLocation, sortOrder, rerender]);

    useEffect(() => {
        sessionStorage.setItem('searchTerm', searchTerm);
        sessionStorage.setItem('selectedBhk', selectedBhk);
        sessionStorage.setItem('selectedLocation', selectedLocation);
        sessionStorage.setItem('sortOrder', sortOrder);
    }, [searchTerm, selectedBhk, selectedLocation, sortOrder, rerender]);

    // Fetch suggestions as the user types
    const fetchSuggestions = async (query) => {
        if (query.length === 0) {
            setSuggestions([]);
            return;
        }
        try {
            const response = await axios.get(
                "https://heavenhome-66467-default-rtdb.asia-southeast1.firebasedatabase.app/properties.json"
            );
            let filteredSuggestions = Object.values(response.data).filter(property =>
                property.title.toLowerCase().includes(query.toLowerCase()) ||
                property.location.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions.slice(0, 5)); // limit suggestions to 5
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    // Debounced version of the fetchSuggestions function
    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        debouncedFetchSuggestions(e.target.value);
    };

    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
    const totalPages = Math.ceil(properties.length / propertiesPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
               {suggestions.length > 0 && (
    <ul className={styles.suggestionsContainer}>
        {suggestions.map((suggestion, index) => (
            <li
                key={index}
                className={styles.suggestionItem}
                onClick={() => {
                    setSearchTerm(suggestion.title); // set the search term
                    setSuggestions([]); // clear suggestions to hide the dropdown
                }}
            >
                {suggestion.title} - {suggestion.location}
            </li>
        ))}
    </ul>
)}
                 <select value={selectedBhk} onChange={(e) => setSelectedBhk(e.target.value)}>
                    <option value="">All BHK Types</option>
                    <option value="1bhk">1BHK</option>
                    <option value="2bhk">2BHK</option>
                    <option value="3bhk">3BHK</option>
                    <option value="4bhk">4BHK</option>
                </select>
                <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                    <option value="">All Locations</option>
                    <option value="koramangala">Koramangala</option>
                    <option value="bellandur">Bellandur</option>
                    <option value="hsr layout">HSR Layout</option>
                    <option value="whitefield">Whitefield</option>
                </select>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="default">Default</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>
    
            <div style={{ maxWidth: "1350px", margin: "auto", padding: "20px" }}>
                <div className={styles.PropertyCardContainer}>
                    {currentProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
                <div className={styles.pagination}>
                    <button onClick={prevPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span> Page {currentPage} of {totalPages} </span>
                    <button onClick={nextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default PropertyListing;

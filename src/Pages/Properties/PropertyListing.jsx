import React, { useState, useEffect, useCallback } from 'react';
import styles from './PropertyListing.module.css';

import axios from 'axios';
import PropertyCard from '../../Components/PropertyCard/PropertyCard';


const PropertyListing = () => {
 

    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState(sessionStorage.getItem('searchTerm') || "");
    const [selectedBhk, setSelectedBhk] = useState(sessionStorage.getItem('selectedBhk') || "");
    const [selectedLocation, setSelectedLocation] = useState(sessionStorage.getItem('selectedLocation') || "");
    const [sortOrder, setSortOrder] = useState(sessionStorage.getItem('sortOrder') || "default");

    const [suggestions, setSuggestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [propertiesPerPage] = useState(9);

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(
                    "https://heavenhome-66467-default-rtdb.asia-southeast1.firebasedatabase.app/properties.json"
                );
                const fetchedProperties = Object.values(response.data);
                setProperties(fetchedProperties);
                setFilteredProperties(fetchedProperties);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, []);

    useEffect(() => {
        let newFilteredProperties = [...properties];

        if (selectedBhk) {
            newFilteredProperties = newFilteredProperties.filter((property) =>
                property.description.toLowerCase().includes(selectedBhk)
            );
        }

        if (selectedLocation) {
            newFilteredProperties = newFilteredProperties.filter((property) =>
                property.location.toLowerCase().includes(selectedLocation)
            );
        }

        if (searchTerm) {
            newFilteredProperties = newFilteredProperties.filter((property) =>
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
            newFilteredProperties.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
            newFilteredProperties.sort((a, b) => b.price - a.price);
        }

        setFilteredProperties(newFilteredProperties);
    }, [properties, searchTerm, selectedBhk, selectedLocation, sortOrder]);

    useEffect(() => {
        sessionStorage.setItem('searchTerm', searchTerm);
        sessionStorage.setItem('selectedBhk', selectedBhk);
        sessionStorage.setItem('selectedLocation', selectedLocation);
        sessionStorage.setItem('sortOrder', sortOrder);
    }, [searchTerm, selectedBhk, selectedLocation, sortOrder]);

    const fetchSuggestions = async (query) => {
        if (query.length === 0) {
            setSuggestions([]);
            return;
        }
        const filteredSuggestions = filteredProperties.filter(property =>
            property.title.toLowerCase().includes(query.toLowerCase()) ||
            property.location.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filteredSuggestions.slice(0, 5));
    };

    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), [filteredProperties]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        debouncedFetchSuggestions(e.target.value);
    };

    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

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
                                   setSearchTerm(suggestion.title);
                                   setSuggestions([]);
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

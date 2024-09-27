

import React, { useState, useEffect } from 'react';
import { listAllIngredients } from '../api';
import '../App.css'

const IngredientFilter = ({ onFilter }) => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch all available ingredients and sort them alphabetically
        listAllIngredients()
            .then(response => {
                const sortedIngredients = response.data.meals.sort((a, b) =>
                    a.strIngredient.localeCompare(b.strIngredient)
                );
                setIngredients(sortedIngredients);
            })
            .catch(error => {
                console.error('Error fetching ingredients:', error);
            });
    }, []);

    const handleSelectIngredient = (ingredient) => {
        // Toggle ingredient selection
        const updatedSelection = selectedIngredients.includes(ingredient)
            ? selectedIngredients.filter(i => i !== ingredient)
            : [...selectedIngredients, ingredient];

        setSelectedIngredients(updatedSelection);
        onFilter(updatedSelection);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter ingredients based on the search term
    const filteredIngredients = ingredients.filter(ingredient =>
        ingredient.strIngredient.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='mainApp'>
            <input 
                type="text" 
                placeholder="Search ingredients..." 
                value={searchTerm} 
                onChange={handleSearch} 
                style={styles.searchBar}
            />
            <div style={styles.ingredientList}>
                {filteredIngredients.map((ingredient) => (
                    <button
                        key={ingredient.strIngredient}
                        style={selectedIngredients.includes(ingredient.strIngredient) ? styles.selectedButton : styles.button}
                        onClick={() => handleSelectIngredient(ingredient.strIngredient)}
                    >
                        {ingredient.strIngredient}
                    </button>
                ))}
            </div>
        </div>
    );
};



const styles = {
    container: {
        marginBottom: '20px',
    },
    buttonsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px', // Add space between the buttons
        justifyContent: 'center',
        marginTop: '10px',
    },
    ingredientButton: {
        backgroundColor: '#4CAF50', // Pleasing green color
        color: 'white', // Text color
        border: 'none', // Remove the border
        borderRadius: '6px', // Rounded corners
        padding: '8px 12px', // Adjust padding for better button size
        fontSize: '14px', // Slightly larger font size for readability
        cursor: 'pointer',
        transition: 'background-color 0.3s ease', // Add transition for hover effect
    },
    ingredientButtonHover: {
        backgroundColor: '#45a049', // Darker green for hover effect
    },
};


export default IngredientFilter;

// IngredientFilter.js

import React, { useState, useEffect } from 'react';
import { listAllIngredients } from '../api';

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
        <div style={styles.container}>
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
        flexWrap: 'wrap', // Allows the buttons to wrap to the next line
        gap: '6px', // Smaller spacing between buttons
        justifyContent: 'center', // Centers the buttons in the container
        marginTop: '10px',
    },
    ingredientButton: {
        width: '80px', // Smaller button width
        height: '30px', // Smaller button height
        padding: '4px', // Reduces padding for a more compact button
        fontSize: '12px', // Adjusted font size for readability while reducing space
        backgroundColor: '#e0e0e0', // Light background to ensure good contrast
        border: '1px solid #bbb', // Simple border to define the buttons
        borderRadius: '6px', // Rounded corners for a clean look
        cursor: 'pointer', // Pointer cursor to indicate clickability
        textAlign: 'center', // Center text inside the button
        overflow: 'hidden', // Prevents text overflow
        whiteSpace: 'nowrap', // Prevents the text from wrapping onto a new line
        textOverflow: 'ellipsis', // Adds "..." if the text is too long
    },
};


export default IngredientFilter;

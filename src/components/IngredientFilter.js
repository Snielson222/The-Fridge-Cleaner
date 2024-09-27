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
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    searchBar: {
        padding: '10px',
        width: '100%',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    ingredientList: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    button: {
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
    },
    selectedButton: {
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        backgroundColor: '#ff6347', // Highlight selected ingredients
        color: '#fff',
        cursor: 'pointer',
    },
};

export default IngredientFilter;

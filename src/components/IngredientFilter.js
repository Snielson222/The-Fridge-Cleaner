// IngredientFilter.js

import React, { useState, useEffect } from 'react';
import { listAllIngredients } from '../api';

const IngredientFilter = ({ onFilter }) => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    useEffect(() => {
        // Fetch all available ingredients
        listAllIngredients()
            .then(response => {
                setIngredients(response.data.meals || []);
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

    return (
        <div style={styles.container}>
            {ingredients.map((ingredient) => (
                <button
                    key={ingredient.strIngredient}
                    style={selectedIngredients.includes(ingredient.strIngredient) ? styles.selectedButton : styles.button}
                    onClick={() => handleSelectIngredient(ingredient.strIngredient)}
                >
                    {ingredient.strIngredient}
                </button>
            ))}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        padding: '20px',
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

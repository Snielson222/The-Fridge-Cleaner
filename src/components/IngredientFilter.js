// IngredientFilter.js

import React, { useState, useEffect } from 'react';

const IngredientFilter = ({ handleFilter }) => {
    const [ingredients, setIngredients] = useState([]);

    // Fetch ingredients from the API
    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
            .then(response => response.json())
            .then(data => {
                const sortedIngredients = data.meals
                    .map((meal) => meal.strIngredient)
                    .filter(Boolean)
                    .sort(); // Sort alphabetically
                setIngredients(sortedIngredients);
            })
            .catch(error => console.error('Error fetching ingredients:', error));
    }, []);

    return (
        <div style={styles.container}>
            <h3>Select Ingredients:</h3>
            <div style={styles.buttonsContainer}>
                {ingredients.map((ingredient, index) => (
                    <button
                        key={index}
                        style={styles.ingredientButton}
                        onClick={() => handleFilter(ingredient)}
                    >
                        {ingredient}
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

// IngredientFilter.js

import React, { useState, useEffect } from 'react';
import { getIngredientsList } from '../api';

const IngredientFilter = ({ onFilter }) => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    useEffect(() => {
        // Fetch the list of ingredients when the component mounts
        getIngredientsList()
            .then(response => {
                const ingredientList = response.data.meals.slice(0, 50); // Limit to 50 common ingredients
                setIngredients(ingredientList);
            })
            .catch(error => console.error("Error fetching ingredients:", error));
    }, []);

    const handleIngredientClick = (ingredient) => {
        // Check if ingredient is already selected
        if (!selectedIngredients.includes(ingredient)) {
            const updatedIngredients = [...selectedIngredients, ingredient];
            setSelectedIngredients(updatedIngredients);
            onFilter(updatedIngredients);
        }
    };

    const clearFilters = () => {
        setSelectedIngredients([]);
        onFilter([]); // Passing an empty array to indicate no filtering
    };

    return (
        <div>
            <h2>Filter by Ingredients</h2>
            <div>
                {ingredients.map(ingredient => (
                    <button
                        key={ingredient.strIngredient}
                        onClick={() => handleIngredientClick(ingredient.strIngredient)}
                        style={{
                            backgroundColor: selectedIngredients.includes(ingredient.strIngredient) ? '#f0c040' : '#e0e0e0',
                        }}
                    >
                        {ingredient.strIngredient}
                    </button>
                ))}
            </div>
            {selectedIngredients.length > 0 && (
                <button onClick={clearFilters} style={{ marginTop: '10px', backgroundColor: '#ff4040', color: '#fff' }}>
                    Clear Filters
                </button>
            )}
        </div>
    );
};

export default IngredientFilter;

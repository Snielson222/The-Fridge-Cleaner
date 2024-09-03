// Create a new file IngredientFilter.js

import React, { useState, useEffect } from 'react';
import { getIngredientsList, filterByIngredient } from '../api';

const IngredientFilter = ({ onFilter }) => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    useEffect(() => {
        // Fetch the list of ingredients when the component mounts
        getIngredientsList()
            .then(response => {
                // Limit to 50 common ingredients
                const ingredientList = response.data.meals.slice(0, 50);
                setIngredients(ingredientList);
            })
            .catch(error => console.error("Error fetching ingredients:", error));
    }, []);

    const handleIngredientClick = (ingredient) => {
        // Check if ingredient is already selected
        if (!selectedIngredients.includes(ingredient)) {
            const updatedIngredients = [...selectedIngredients, ingredient];
            setSelectedIngredients(updatedIngredients);

            // Call the onFilter callback with updated ingredients list
            onFilter(updatedIngredients);
        }
    };

    return (
        <div>
            <h2>Filter by Ingredients</h2>
            <div>
                {ingredients.map(ingredient => (
                    <button 
                        key={ingredient.strIngredient} 
                        onClick={() => handleIngredientClick(ingredient.strIngredient)}
                    >
                        {ingredient.strIngredient}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default IngredientFilter;

// IngredientFilter.js

import React, { useState, useEffect } from 'react';
import { getIngredientsList } from '../api';

const IngredientFilter = ({ onFilter }) => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    useEffect(() => {
        getIngredientsList()
            .then(response => {
                const ingredientList = response.data.meals.slice(0, 50); // Limit to 50 common ingredients
                setIngredients(ingredientList);
            })
            .catch(error => console.error("Error fetching ingredients:", error));
    }, []);

    const handleIngredientClick = (ingredient) => {
        let updatedIngredients;
        if (!selectedIngredients.includes(ingredient)) {
            updatedIngredients = [...selectedIngredients, ingredient];
        } else {
            updatedIngredients = selectedIngredients.filter(item => item !== ingredient);
        }
        setSelectedIngredients(updatedIngredients);
        onFilter(updatedIngredients);
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
                            color: selectedIngredients.includes(ingredient.strIngredient) ? '#fff' : '#000',
                            margin: '5px',
                            padding: '10px 15px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        {ingredient.strIngredient}
                    </button>
                ))}
            </div>
            {selectedIngredients.length > 0 && (
                <button onClick={clearFilters} style={{ marginTop: '10px', backgroundColor: '#ff4040', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                    Clear Filters
                </button>
            )}
        </div>
    );
};

export default IngredientFilter;

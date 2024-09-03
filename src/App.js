// App.js

import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import IngredientFilter from './components/IngredientFilter';
import { searchMealByName, filterByIngredient } from './api';

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [message, setMessage] = useState('');

    const handleSearch = (query) => {
        searchMealByName(query)
            .then(response => {
                setRecipes(response.data.meals || []);
                setMessage(response.data.meals ? '' : 'No recipes found.');
            })
            .catch(error => {
                console.error("Error fetching recipes:", error);
                setMessage('Error fetching recipes.');
            });
    };

    const handleFilter = (selectedIngredients) => {
        if (selectedIngredients.length > 0) {
            const ingredientPromises = selectedIngredients.map(ingredient => filterByIngredient(ingredient));

            Promise.all(ingredientPromises)
                .then(responses => {
                    const filteredMeals = responses.reduce((acc, response) => {
                        const meals = response.data.meals || [];
                        if (acc.length === 0) {
                            return meals;
                        } else {
                            return acc.filter(meal => meals.some(m => m.idMeal === meal.idMeal));
                        }
                    }, []);

                    setRecipes(filteredMeals);
                    setMessage(filteredMeals.length > 0 ? '' : 'No recipes found with selected ingredients.');
                })
                .catch(error => {
                    console.error("Error filtering recipes:", error);
                    setMessage('Error filtering recipes.');
                });
        } else {
            setRecipes([]);
            setMessage('Please select ingredients to filter recipes.');
        }
    };

    return (
        <div>
            <h1>Recipe Finder</h1>
            <SearchBar onSearch={handleSearch} />
            <IngredientFilter onFilter={handleFilter} />
            {message && <p>{message}</p>}
            <RecipeList recipes={recipes} />
        </div>
    );
};

export default App;


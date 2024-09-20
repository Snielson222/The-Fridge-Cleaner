// App.js

import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import IngredientFilter from './components/IngredientFilter';
import { searchMealByName, filterByIngredient, lookupMealById } from './api';

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Function to handle meal search by name
    const handleSearch = (searchQuery) => {
        if (searchQuery) {
            setLoading(true);
            searchMealByName(searchQuery)
                .then(response => {
                    const meals = response.data.meals || [];
                    if (meals.length > 0) {
                        fetchFullDetails(meals);
                    } else {
                        setRecipes([]);
                        setMessage('No recipes found for the searched term.');
                    }
                })
                .catch(error => {
                    console.error("Error searching meals:", error);
                    setMessage('Error searching meals.');
                })
                .finally(() => setLoading(false));
        } else {
            setRecipes([]);
            setMessage('Please enter a search term.');
        }
    };

    const handleFilter = (selectedIngredients) => {
        if (selectedIngredients.length > 0) {
            setLoading(true);
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

                    if (filteredMeals.length === 0) {
                        setRecipes([]);
                        setMessage('No recipes found with selected ingredients.');
                    } else {
                        fetchFullDetails(filteredMeals);
                    }
                })
                .catch(error => {
                    console.error("Error filtering recipes:", error);
                    setMessage('Error filtering recipes.');
                })
                .finally(() => setLoading(false));
        } else {
            setRecipes([]);
            setMessage('Please select ingredients to filter recipes.');
        }
    };

    const fetchFullDetails = (meals) => {
        const detailPromises = meals.map(meal => lookupMealById(meal.idMeal));

        Promise.all(detailPromises)
            .then(responses => {
                const fullDetails = responses.map(response => response.data.meals[0]);
                setRecipes(fullDetails);
                setMessage('');
            })
            .catch(error => {
                console.error("Error fetching meal details:", error);
                setMessage('Error fetching meal details.');
            });
    };

    return (
        <div>
            <h1>Recipe Finder</h1>
            <SearchBar onSearch={handleSearch} />
            <IngredientFilter onFilter={handleFilter} />
            {loading && <p>Loading...</p>}
            {message && <p>{message}</p>}
            <RecipeList recipes={recipes} />
        </div>
    );
};

export default App;

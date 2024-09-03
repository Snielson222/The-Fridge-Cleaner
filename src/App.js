import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import IngredientFilter from './components/IngredientFilter';
import { searchMealByName, filterByIngredient } from './api';

const App = () => {
    const [recipes, setRecipes] = useState([]);

    const handleSearch = (query) => {
        searchMealByName(query)
            .then(response => {
                setRecipes(response.data.meals || []);
            })
            .catch(error => {
                console.error("Error fetching recipes:", error);
            });
    };

    const handleFilter = (selectedIngredients) => {
        // If multiple ingredients are selected, make a combined API call for each ingredient
        if (selectedIngredients.length > 0) {
            const ingredientPromises = selectedIngredients.map(ingredient => filterByIngredient(ingredient));

            Promise.all(ingredientPromises)
                .then(responses => {
                    // Combine results by matching meal IDs
                    const filteredMeals = responses.reduce((acc, response) => {
                        const meals = response.data.meals || [];
                        if (acc.length === 0) {
                            return meals;
                        } else {
                            // Filter to only include meals that appear in all ingredient lists
                            return acc.filter(meal => meals.some(m => m.idMeal === meal.idMeal));
                        }
                    }, []);

                    setRecipes(filteredMeals);
                })
                .catch(error => {
                    console.error("Error filtering recipes:", error);
                });
        }
    };

    return (
        <div>
            <h1>Recipe Finder</h1>
            <SearchBar onSearch={handleSearch} />
            <IngredientFilter onFilter={handleFilter} />
            <RecipeList recipes={recipes} />
        </div>
    );
};

export default App;

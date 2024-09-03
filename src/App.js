import React, { useState } from 'react';
import SearchBar from './SearchBar';
import RecipeList from './RecipeList';
import { searchMealByName } from './api';

const App = () => {
    const [recipes, setRecipes] = useState([]);

    const handleSearch = (query) => {
        searchMealByName(query)
            .then(response => {
                setRecipes(response.data.meals);
            })
            .catch(error => {
                console.error("Error fetching recipes:", error);
            });
    };

    return (
        <div>
            <h1>Recipe Finder</h1>
            <SearchBar onSearch={handleSearch} />
            <RecipeList recipes={recipes} />
        </div>
    );
};

export default App;

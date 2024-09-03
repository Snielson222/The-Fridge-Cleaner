import React from 'react';

const RecipeList = ({ recipes }) => {
    return (
        <div>
            {recipes.map(recipe => (
                <div key={recipe.idMeal}>
                    <h2>{recipe.strMeal}</h2>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                </div>
            ))}
        </div>
    );
};

export default RecipeList;

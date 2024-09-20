// RecipeList.js

import React from 'react';

const RecipeList = ({ recipes }) => {
    return (
        <div style={styles.recipeListContainer}>
            {recipes.map((recipe) => (
                <div key={recipe.idMeal} style={styles.card}>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} style={styles.thumbnail} />
                    <h3>{recipe.strMeal}</h3>
                    
                    {/* Scrollable Ingredients Container */}
                    <div style={styles.ingredientsContainer}>
                        <h4>Ingredients:</h4>
                        <div style={styles.ingredientsList}>
                            {Array.from({ length: 20 }, (_, i) => i + 1)
                                .map(index => recipe[`strIngredient${index}`] && recipe[`strIngredient${index}`].trim())
                                .filter(Boolean)
                                .map((ingredient, i) => (
                                    <p key={i} style={styles.ingredientItem}>
                                        {ingredient} - {recipe[`strMeasure${i + 1}`]}
                                    </p>
                                ))}
                        </div>
                    </div>

                    {/* Instructions Container */}
                    <div style={styles.instructionsContainer}>
                        <h4>Instructions:</h4>
                        <p>{recipe.strInstructions}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const styles = {
    recipeListContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
    },
    thumbnail: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '10px',
    },
    ingredientsContainer: {
        maxHeight: '150px', // Set max height for the scrollable container
        overflowY: 'scroll',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
    },
    ingredientsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    ingredientItem: {
        margin: '0',
        fontSize: '14px',
    },
    instructionsContainer: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f1f1f1',
        marginTop: '10px',
    },
};

export default RecipeList;

// RecipeList.js

import React from 'react';

const RecipeList = ({ recipes }) => {
    return (
        <div style={styles.container}>
            {recipes.map((recipe) => (
                <div key={recipe.idMeal} style={styles.card}>
                    <img src={`${recipe.strMealThumb}/preview`} alt={recipe.strMeal} style={styles.image} />
                    <h3 style={styles.title}>{recipe.strMeal}</h3>
                    <div style={styles.instructionsContainer}>
                        <p style={styles.instructions}>{recipe.strInstructions}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        padding: '20px',
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        maxHeight: '400px', // Limits the overall card height
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
    image: {
        width: '100%',
        borderRadius: '5px',
        marginBottom: '10px',
    },
    title: {
        fontSize: '18px',
        marginBottom: '10px',
        color: '#333',
    },
    instructionsContainer: {
        overflowY: 'auto',
        flexGrow: 1,
        padding: '5px',
    },
    instructions: {
        fontSize: '14px',
        color: '#555',
        lineHeight: '1.5',
        maxHeight: '150px', // Controls the maximum height of instructions area
        overflowY: 'auto', // Allows scrolling if content exceeds maxHeight
        margin: 0,
    },
};

export default RecipeList;

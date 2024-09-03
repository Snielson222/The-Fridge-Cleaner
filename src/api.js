import axios from 'axios';

const API_KEY = '1'; // Test key as mentioned in the documentation
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

export const searchMealByName = (name) => {
    return axios.get(`${BASE_URL}search.php?s=${name}`);
};

export const getMealById = (id) => {
    return axios.get(`${BASE_URL}lookup.php?i=${id}`);
};

export const getRandomMeal = () => {
    return axios.get(`${BASE_URL}random.php`);
};

export const getMealCategories = () => {
    return axios.get(`${BASE_URL}categories.php`);
};

export const filterByIngredient = (ingredient) => {
    return axios.get(`${BASE_URL}filter.php?i=${ingredient}`);
};

export const getIngredientsList = () => {
    return axios.get(`${BASE_URL}list.php?i=list`);
};

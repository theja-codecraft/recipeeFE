import { base_Url } from "./base_Url";
import { commonAPI } from "./commonApi";

// ADD recipe
export const addRecipeApi = async (data) => {
  return await commonAPI("POST", `${base_Url}/add-recipe`, data, "");
};

// GET all recipes
export const getAllRecipeApi = async () => {
  return await commonAPI("GET", `${base_Url}/all-recipe`, "", "");
};

// DELETE a recipe by ID
export const deleteRecipeApi = async (id) => {
  return await commonAPI("DELETE", `${base_Url}/delete-recipe/${id}`, "", "");
};

// UPDATE a recipe by ID
export const updateRecipeApi = async (id, data) => {
  return await commonAPI("PUT", `${base_Url}/update-recipe/${id}`, data, "");
};

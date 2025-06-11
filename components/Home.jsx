import React, { useState, useEffect } from 'react';
import {
  addRecipeApi,
  getAllRecipeApi,
  deleteRecipeApi,
  updateRecipeApi
} from '../src/services/allApi';

function Home() {
  const [addrecipe, setaddrecipe] = useState({ name: '', recipe: '' });
  const [recipes, setRecipes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedRecipe, setEditedRecipe] = useState({ name: '', recipe: '', _id: '' });
  const [searchTerm, setSearchTerm] = useState(""); // Declare search state

  

  // Fetch all recipes on page load
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await getAllRecipeApi();
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Add new recipe
  const handleAddRecipe = async () => {
    try {
      const result = await addRecipeApi(addrecipe);
      if (result) {
        setRecipes([...recipes, result.data]); // Use result.data if API returns the added recipe
        setaddrecipe({ name: '', recipe: '' });
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  // Delete recipe
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this recipe?");
    if (confirmDelete) {
      await deleteRecipeApi(id);
      setRecipes(recipes.filter((r) => r._id !== id));
    }
  };

  // Update edited recipe
  const handleUpdate = async () => {
    try {
      await updateRecipeApi(editedRecipe._id, {
        name: editedRecipe.name,
        recipe: editedRecipe.recipe
      });

      const updatedList = recipes.map((r, i) =>
        i === editIndex ? editedRecipe : r
      );

      setRecipes(updatedList);
      setEditIndex(null);
      setEditedRecipe({ name: '', recipe: '', _id: '' });
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };


const filteredRecipes = recipes.filter(recipe =>
  recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  recipe.recipe.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center mb-4">Submit Your Recipe</h2>

        {/* Name Input */}
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label fw-bold">Name</label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            placeholder="Enter your name"
            value={addrecipe.name}
            onChange={(e) => setaddrecipe({ ...addrecipe, name: e.target.value })}
          />
        </div>

        {/* Recipe Input */}
        <div className="mb-3">
          <label htmlFor="recipeInput" className="form-label fw-bold">Recipe</label>
          <textarea
            className="form-control"
            id="recipeInput"
            rows="4"
            placeholder="Enter your recipe"
            value={addrecipe.recipe}
            onChange={(e) => setaddrecipe({ ...addrecipe, recipe: e.target.value })}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button className="btn btn-primary px-4" onClick={handleAddRecipe}>Submit Recipe</button>
        </div>
      </div>

      <div className="mb-4 mt-5">
  <input
    type="text"
    className="form-control"
    placeholder="Search by name or recipe..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>


      {/* Display Recipes */}
      <div className="mt-5">
        <h3 className="text-center mb-4">Recipe List</h3>

        {filteredRecipes.length === 0 ? (
          <div className="alert alert-warning text-center">No recipes found</div>
        ) : (
          <div className="row">
            {filteredRecipes.map((item, index) => (
              <div key={item._id} className="col-md-4">
                <div className="card shadow-sm mb-3">
                  <div className="card-body">


                    
                    {editIndex === index ? (
                      <>
                        <input
                          type="text"
                          className="form-control mb-2"
                          value={editedRecipe.name}
                          onChange={(e) =>
                            setEditedRecipe({ ...editedRecipe, name: e.target.value })
                          }
                        />
                        <textarea
                          className="form-control mb-2"
                          value={editedRecipe.recipe}
                          onChange={(e) =>
                            setEditedRecipe({ ...editedRecipe, recipe: e.target.value })
                          }
                        ></textarea>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={handleUpdate}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditIndex(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <h5 className="card-title fw-bold">{item.name}</h5>
                        <p className="card-text">{item.recipe}</p>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => {
                            setEditIndex(index);
                            setEditedRecipe({ name: item.name, recipe: item.recipe, _id: item._id });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

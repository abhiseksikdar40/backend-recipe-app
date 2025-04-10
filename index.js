const { initializeRecipeData } = require('./db/db.connect')
initializeRecipeData()

const RecipeApp = require('./models/recipeApp.models')

const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())


const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})


// 3. Create an API with route "/recipes" to create a new recipe in the recipes database. Make sure to handle errors properly. Test your API with Postman. Add the following recipe:
// 4. Run your API and create another recipe data in the database.
// 5. Run your API and create another recipe data in the database.

async function createRecipeData(newRecipeData) {
   try {
    const createRecipe = new RecipeApp(newRecipeData)
    await createRecipe.save()
    return createRecipe
   } catch (error) {
    console.log("Error Creating Recipe Data", error);
   }
}

app.post("/recipes", async (req, res) => {
    try {
        const createdRecipe = await createRecipeData(req.body)
        res.status(201).json({message: "Recipe Created Successfully.", recipe: createdRecipe})
    } catch (error) {
        res.status(500).json({error: "Failed To Create Recipe Data."})
    }
})


// 6. Create an API to get all the recipes in the database as a response. Make sure to handle errors properly.

async function getAllRecipe() {
    try {
        const allRecipe = await RecipeApp.find()
        return allRecipe
    } catch (error) {
        console.log("Error occured while getting all recipes.");  
    }
}

app.get("/recipes", async (req, res) => {
    try {
        const getRecipe = await getAllRecipe()
        if(getRecipe.length != 0) {
            res.json(getRecipe)
        } else {
            res.status(404).json({error: "Recipe Not Found!"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed To Get All Recipes!"})
    }
})


// 7. Create an API to get a recipe's details by its title. Make sure to handle errors properly.

async function getRecipeByTitle(recipeTitle) {
    try {
        const findRecipeByTitle = await RecipeApp.findOne({title: recipeTitle})
        return findRecipeByTitle
    } catch (error) {
        console.log("Error occured while getting recipes by title.");  
    }
}

app.get("/recipes/:title", async (req, res) => {
    try {
        const recipeByTitle = await getRecipeByTitle(req.params.title)
        if(recipeByTitle) {
            res.json(recipeByTitle)
        } else {
            res.status(404).json({error: "Recipe Not Found!"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed To Get Recipes By Title!"})
    }
})


// 8. Create an API to get details of all the recipes by an author. Make sure to handle errors properly.

async function getRecipesByAuthor(authorOfRecipe) {
    try {
        const findRecipeByAuthor = await RecipeApp.find({author: authorOfRecipe})
        return findRecipeByAuthor
    } catch (error) {
        console.log("Error occured while getting recipes by author.");  
    }
}

app.get("/recipes/author/:author", async (req, res) => {
    try {
        const recipeByAuthor = await getRecipesByAuthor(req.params.author)
        if(recipeByAuthor.length != 0) {
            res.json(recipeByAuthor)
        } else {
            res.status(404).json({error: "Recipe Not Found!"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed To Get Recipes By Author!"})
    }
})

// 9. Create an API to get all the recipes that are of "Easy" difficulty level.

async function getRecipesByDifficultyLevel(difficultyLevel) {
    try {
        const findRecipeByDifficultyLevel = await RecipeApp.find({difficulty: difficultyLevel})
        return findRecipeByDifficultyLevel
    } catch (error) {
        console.log("Error occured while getting recipes by difficulty level.");  
    }
}

app.get("/recipes/level/:difficulty", async (req, res) => {
    try {
        const recipeByDifficulty = await getRecipesByDifficultyLevel(req.params.difficulty)
        if(recipeByDifficulty.length != 0) {
            res.json(recipeByDifficulty)
        } else {
            res.status(404).json({error: "Recipe Not Found!"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed To Get Recipes By Difficulty Level!"})
    }
})


// 10. Create an API to update a recipe's difficulty level with the help of its id. Update the difficulty of "Spaghetti Carbonara" from "Intermediate" to "Easy". Send an error message "Recipe not found" if the recipe is not found. Make sure to handle errors properly.

async function updateRecipeDifficulty(recipeId, dataToUpdate) {
    try {
        const findAndUpdateRecipeDifficulty = await RecipeApp.findByIdAndUpdate(recipeId, dataToUpdate, {new: true})
        return findAndUpdateRecipeDifficulty
    } catch (error) {
        console.log("Error occured while updating recipe difficulty level.");  
    }
}

app.post("/recipes/diff/:recipeId", async (req, res) => {
    try {
        const updatedRecipe = await updateRecipeDifficulty(req.params.recipeId, req.body)
        if(updatedRecipe) {
            res.status(200).json({message: "Recipe Data Updated Successfully.", recipe: updatedRecipe})
        } else {
            res.status(404).json({error: "Recipe Not Found!"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed To Update Recipe Difficulty Level!"})
    }
})


// 11. Create an API to update a recipe's prep time and cook time with the help of its title. Update the details of the recipe "Chicken Tikka Masala". Send an error message "Recipe not found" if the recipe is not found. Make sure to handle errors properly.

async function updateRecipeDetailsByTitle(recipeTitle, dataToUpdate) {
    try {
        const findByTitleAndUpdateDetails = await RecipeApp.findOneAndUpdate({title: recipeTitle}, dataToUpdate, {new: true})
        return findByTitleAndUpdateDetails
    } catch (error) {
        console.log("Error occured while updating recipe details.");  
    }
}

app.post("/recipes/name/:recipeTitle", async (req, res) => {
    try {
        const updatedRecipe = await updateRecipeDetailsByTitle(req.params.recipeTitle, req.body)
        if(updatedRecipe) {
            res.status(200).json({message: "Recipe Data Updated Successfully.", recipe: updatedRecipe})
        } else {
            res.status(404).json({error: "Recipe Not Found!"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed To Update Recipe Details!"})
    }
})


// 12. Create an API to delete a recipe with the help of a recipe id. Send an error message "Recipe not found" if the recipe does not exist. Make sure to handle errors properly.

async function deleteRecipe(recipeId) {
    try {
        const findRecipeAndDelete = await RecipeApp.findByIdAndDelete(recipeId)
        return findRecipeAndDelete
    } catch (error) {
        console.log("Error occured while deleting recipe details.");  
    }
}

app.delete("/recipes/delete/:recipeId", async (req, res) => {
    try {
        const deletedRecipe = await deleteRecipe(req.params.recipeId)
        if(deletedRecipe) {
            res.status(200).json({message: "Recipe Data Deleted Successfully."})
        } else {
            res.status(404).json({error: "Recipe Not Found!"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed To Delete Recipe Details!"})
    }
})
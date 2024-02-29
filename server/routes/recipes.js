const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get('/get-ingredients', authorization, async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT owned_ingredients FROM users WHERE user_id = $1", [req.user]
        )
        res.json(user.rows[0]);
    } catch (error) {
        console.log('get-ingredients', error.message);
    }
});

router.post('/save-ingredients', authorization, async (req, res) => {
    try {
        const { owned_ingredients } = req.body;
        const user = await pool.query(
            "UPDATE users SET owned_ingredients = $1 WHERE user_id = $2 RETURNING *", [owned_ingredients, req.user],
        )
        return res.json(user);
    } catch (error) {
        console.log('save-ingredients', error.message);
    }
});

router.get('/get-favorite-recipes', authorization, async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT favorite_recipes FROM users WHERE user_id = $1", [req.user]
        )
        res.json(user.rows[0]);
    } catch (error) {
        console.log('get-recipes', error.message);
    }
});

router.post('/save-recipe', authorization, async (req, res) => {
    try {
        const recipe_id = req.body;
        const getRecipes = await pool.query(
            "SELECT favorite_recipes FROM users WHERE user_id = $1", [req.user]
        )
        const favoriteRecipes = getRecipes.rows[0].favorite_recipes;
        if (favoriteRecipes === null) {
            try {
                const recipe = await pool.query(
                    "UPDATE users SET favorite_recipes = $1 WHERE user_id = $2 RETURNING *", [recipe_id, req.user]
                )
            } catch (error) {
                console.log('save-recipe-inner', error.message);
            }
        } else {
            const recipesArray = favoriteRecipes.split(",");
            if (!recipesArray.includes(recipe_id)) {
                recipesArray.push(recipe_id);
                const stringifiedRecipes = recipesArray.join(',');
                const recipe = await pool.query(
                    "UPDATE users SET favorite_recipes = $1 WHERE user_id = $2 RETURNING *", [stringifiedRecipes, req.user]
                )
            } else {
                const removeFavoriteRecipe = recipesArray.filter(
                    (recipe) => recipe !== recipe_id && recipe_id !== ''
                );
                const stringifiedRecipes = removeFavoriteRecipe.join(',');
                const recipe = await pool.query(
                    "UPDATE users SET favorite_recipes = $1 WHERE user_id = $2 RETURNING *", [stringifiedRecipes, req.user]
                )

                return res.json({ removed: true })
            }
        }
        return res.json(favoriteRecipes);
    } catch (error) {
        console.log('save-recipe', error.message);
    }
});

module.exports = router;
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
        console.log(req.body);
        const { owned_ingredients } = req.body;
        const user = await pool.query(
            "UPDATE users SET owned_ingredients = $1 WHERE user_id = $2 RETURNING *", [owned_ingredients, req.user], 
        )
        return res.json(user);
    } catch (error) {
        console.log('save-ingredients', error.message);
    }
});

module.exports = router;
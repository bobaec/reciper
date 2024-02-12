const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

router.post("/register", validInfo, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await pool.query(
            "SELECT * FROM users WHERE user_email = $1",
            [email]
        );
        if (user.rows.length !== 0) {
            return res.status(401).json("User already exists");
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        );
        const token = jwtGenerator(newUser.rows[0].user_id);
        return res.json({ token });
    } catch (error) {
        console.log("register", error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/login", validInfo, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query(
            "SELECT * FROM users WHERE user_email = $1",
            [email]
        );
        if (user.rows.length === 0) {
            return res.status(401).json("Invalid Credentials");
        }
        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].user_password
        );
        if (!validPassword) {
            return res.status(401).json("Invalid Credentials");
        }
        const token = jwtGenerator(user.rows[0].user_id);
        return res.json({ token });
    } catch (error) {
        console.log("login", error.message);
        res.status(500).send("Server Error, could not login");
    }
});

router.get("/verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.log("verify", error.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;

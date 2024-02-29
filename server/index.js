const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(express.json()); // req.body;
app.use(express.text());
app.use(cors());

// routes
app.use("/auth", require("./routes/jwtAuth"));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/recipes', require('./routes/recipes'));

app.listen(5000, () => {
    console.log('server is running on server 5000');
})
const express = require('express');
const { connection } = require("./config/db");
const { todoRoutes } = require("./routes/todoRoutes");
const cors = require("cors");

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the TodoApp");
});

app.use('/api/todos', todoRoutes);

app.listen(process.env.PORT, async () => { 
    try {
        await connection
        console.log("Connected to the database successfully");
        console.log(`server is running on port ${process.env.PORT}`);
    } catch (err) {
        console.log("Error while connecting to DB");
        console.log(err);
    }
});

const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
require("dotenv").config();

const PORT = 3000;

/* 
    Middleware
    express.json() - Used to parse the body of the request into a usable format i.e JSON
    express.static() - To serve static files
*/
app.use(express.static("./public"));
app.use(express.json());

/*
    // Routes
    GET /api/v1/tasks           - get all tasks
    POST /api/v1/tasks          - create a new task
    GET /api/v1/tasks/:id       - get a single task by id
    PUT/PATCH /api/v1/tasks/:id - update a task
    DELETE /api/v1/tasks/:id    - delete a task
*/

app.use("/api/v1/tasks", tasks);

/* CUSTOM 404 for API */
app.use(notFound);

// Setting up connection to database, and if only the connection is successful we run the server.
// connectDB returns a promise, hence we handle it using async and await
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI).then(() =>
            console.log("DB Connection Established ..")
        );
        app.listen(PORT, () =>
            console.log(`Server is running on port ${PORT}`)
        );
    } catch (error) {}
};

start();

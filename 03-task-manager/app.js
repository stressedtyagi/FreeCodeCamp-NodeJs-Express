const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

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

/* Custom error handler middleware for asyncWrapper */
app.use(errorHandlerMiddleware);

// Setting up connection to database, and if only the connection is successful we run the server.
// connectDB returns a promise, hence we handle it using async and await
// if and only if the await gets resolved then only app.listen runs. Hence we don't need `DB connection Established` string here
// but still we are using it here to demonstrate
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

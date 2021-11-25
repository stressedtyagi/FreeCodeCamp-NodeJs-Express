require("dotenv").config();

// Express own package to handle custom errors
// It works same as asyncWrappers, we just need to use throw anywhere
// we need to throw our errors
require("express-async-errors");
const express = require("express");
const app = express();
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Home Page Route
app.get("/", (req, res) => {
    res.send(
        '<h1>Store API</h1><a href="/api/v1/products"> Products Route</a>'
    );
});

// Other Routes
app.use("/api/v1/products", productsRouter);

// Error Handler Middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
    try {
        // Connect to DB
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (err) {}
};

start();

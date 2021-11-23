const mongoose = require("mongoose");
/* 
// Not using this way to connect to mongoose since, by using thing our server still runs even if we don't get connected to database. 
// But ideal way to not run or kill the server if we don't get connected to database successfully. Hence refractoring this code a little bit
// to call the connection in app.js file rather here
mongoose
    .connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to DB .."))
    .catch((err) => console.log(err));
*/

const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;

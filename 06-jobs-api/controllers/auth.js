const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { name, email, password } = req.body;

    /*  
        moving this code to User.js in models 
        so that we can use the middleware functionality of mongoose rather than
        writing the code here

    */

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const tempUser = { name, email, password: hashedPassword };

    /* 
        Instead of this we will be using mongoose validator
        to get clean and meaningfull error messages

        if (!name || !email || !password) {
            throw new BadRequestError("Please provide name, email and password");
        } 
    */
    /* 
        bad practice, as we are storing password as it is in the database.  
        ...req.body <- using spread operator here to spread the values of req.body and inserting new document in the mongoose database
        
        const user = await User.create({ ...req.body });
    */

    const user = await User.create({ ...tempUser });
    res.status(StatusCodes.CREATED).json({ user });
};
const login = async (req, res) => {
    res.send("login user");
};

module.exports = {
    register,
    login,
};

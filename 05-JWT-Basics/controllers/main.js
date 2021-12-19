/*  
    TODO for this file :
        - Check username, password in post(login) request 
        - if exist create new JWT
        - send back to front-end, otherwise send error

        - Finally, setup authentication so only the request with JWT can access the dashboard
*/
const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { username, password } = req.body;
    /* 
        We can use 3 ways to do validation :
            1. Checking up on database using mongoose validation (not doing this in this project)
            2. JOI package
            3. check in with controller
    */
    if (!username || !password) {
        throw new CustomAPIError("Username or Password not found", 400);
    }

    // Demo Payload, ideal way is to connect to DB and send the user id as payload
    // so that later we can retrieve that easily
    const id = new Date().getDate();

    // Keep payload small, for better user experience. Bigger payload more time to decode
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    res.status(200).json({ msg: "User Created", token });
};

const dashboard = async (req, res) => {
    const user = req.user;
    console.log(user);
    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
        msg: `Hello ${user.username}`,
        secret: `Here is your authorized data, lucky number ${luckyNumber}`,
    });
};

module.exports = {
    login,
    dashboard,
};

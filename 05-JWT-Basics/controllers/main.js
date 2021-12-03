/*  
    TODO for this file :
        - Check username, password in post(login) request 
        - if exist create new JWT
        - send back to front-end, otherwise send error

        - Finally, setup authentication so only the request with JWT can access the dashboard
*/

const login = async (req, res) => {
    res.status(200).send("LOGIN ROUTE");
};

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: "Hello Sir",
        secret: `Here is your authorized data, lucky number ${luckyNumber}`,
    });
};

module.exports = {
    login,
    dashboard,
};

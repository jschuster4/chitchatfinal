const UserController = require("../controllers/user.controllers")
const {authenticate} = require("../config/jwt.config")

module.exports = app => {
    app.post("/api/users/register", UserController.register),
    app.post("/api/users/login",  UserController.login),


    app.get("/api/users", authenticate, UserController.getAllUsers)
}

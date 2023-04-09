const auth = require("./auth/index");
const admin = require("./admin/index");
const user = require("./user/index");
const controllers = {
    auth,
    admin,
    user,
}

module.exports = controllers;
const {Router } = require("express");

const { auth } = require("../middlewares/auth");

const { currentcityip } = require("../controller/currentcity.controller");

const redis_limit = require("../middlewares/redislimiter");

const currentcity = Router();

currentcity.get("/city",auth,currentcityip);

module.exports = {currentcity};
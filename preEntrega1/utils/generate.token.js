const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_PAYLOAD } = require("../config/config.jwt.js");

const generateToken = (user) => jwt.sign({ user }, JWT_SECRET, JWT_PAYLOAD);

module.exports = { generateToken };
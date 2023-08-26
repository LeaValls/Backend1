const { Router } = require("express");

const userManager = require("../../managers/UserManager");
const { generateToken } = require("../../utils/generate.token");
const { isValidPassword } = require("../../utils/password.utils");

const router = Router();

// creamos una ruta para authenticar usuarios de API
// mandamos un post request a /api/login
// para obtener un token que usaremos en las demas llamadas al api
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userManager.getByEmail(email);

        console.log(password, user);

        if (!user || !isValidPassword(password, user?.password)) {
            return res.send({
                status: "failure",
                error: "Failed login",
            });
        }

        const token = generateToken(user);

        return res.send({
            status: "success",
            message: token,
        });
    } catch (error) {
        console.log(error);

        res.send({
            status: "failure",
            error,
        });
    }
});

module.exports = { jwtRoutes: router };
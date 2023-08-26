const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    PORT,
    HOST,
    GITHUB_STRATEGY_NAME,
} = require("./config.passwords");

const GithubStrategy = require("passport-github2");

const userManager = require("../managers/UserManager");

const GitHubAccessConfig = {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: `http://${HOST}:${PORT}/githubSessions`,
};

/**
 * GENERO LA LOGICA DE NUESTRO USER
 */

const gitHubUsers = async (profile, done) => {
    const { name, email } = profile._json;
    const _user = await userManager.getByEmail(email);

    if (!_user) {
        console.log("usuario no existe");

        const newUser = {
            firstname: name.split(" ")[0],
            lastname: name.split(" ")[1],
            email: email,
            password: "",
            gender: "none",
        };

        const result = await userManager.create(newUser);
        return done(null, result);
    }
    /**
     * Caso de que el usuario ya existiera
     */
    console.log("Usuario existe, rol asignado: ", _user?.role);

    return done(null, _user);
};

const profileGithubController = async (
    accessToken,
    refreshToken,
    profile,
    done
) => {
    try {
        return await gitHubUsers(profile, done);
    } catch (error) {
        done(error);
    }
};

module.exports = {
    GithubStrategy,
    GitHubAccessConfig,
    profileGithubController,
    strategyName: GITHUB_STRATEGY_NAME,
};
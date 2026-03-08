const router = require("express").Router();
const passport = require("passport");
const { googleCallback } = require("../controllers/oauth.controller");
const env = require("../config/env");

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: `${env.CLIENT_URL}/account/oauth-failure` }), googleCallback
);

module.exports = router

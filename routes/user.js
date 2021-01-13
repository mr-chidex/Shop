const expressPromise = require("express-promise-router");
const userControllers = require("../controllers/user");
const router = expressPromise();
const passport = require("passport");
const Strategy = require("../validation/passport");

router.route("/signup")
    .get(userControllers.getSignUp);

router.route("/signup")
    .post(userControllers.postSignUp);

router.route("/signin")
    .get(userControllers.getSignIn);

router.route("/signin")
    .post(passport.authenticate("local", { session: false }), userControllers.postSingIn);

module.exports = router;
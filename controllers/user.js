const User = require("../model/user");

module.exports = {
    getSignUp: async (req, res, next) => {
        res.render("shop/signup", {
            path: "/user/signup",
            pageTitle: "Sign Up"
        })
    },
    postSignUp: async (req, res, next) => {
        const { firstname, lastname, email, password, confirmPassword } = req.body;

        // check if email already exist
        const user = await User.findOne({ email })
        if (user) {
            return res.redirect("/user/signup");
            // return res.json({ err: "user already exist" })
        }

        const newUser = await new User({
            firstname,
            lastname,
            email,
            password,
            confirmPassword,
            cart: []
        })

        await newUser.save();

        // res.json({ msg: "sign up", newUser });
        res.redirect("/user/signin");
    },
    getSignIn: async (req, res, next) => {
        res.render("shop/signin", {
            path: "/user/signin",
            pageTitle: "Sign In"
        })
    },
    postSingIn: async (req, res, next) => {
        // console.log("post", req.user)
        res.redirect("/")
    }
}
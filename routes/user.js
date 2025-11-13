const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const { saveRedirectUrl } = require("../middleware.js");

// Show signup form
router.get("/signup", (req, res) => {
    res.render("users/signup");
});

// Handle signup
router.post("/signup", async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        // Auto-login
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to GoTrip!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
});

// Show login form
router.get("/login", (req, res) => {
    res.render("users/login");
});

// Handle login
router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    (req, res) => {
        req.flash("success", "Welcome back to GoTrip!");
        const redirectUrl = req.session.returnTo || "/listings";
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    }
);

// Logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
});

module.exports = router;

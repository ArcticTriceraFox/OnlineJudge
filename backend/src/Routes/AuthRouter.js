const { signup, login } = require("../Controllers/AuthController");
const router = require("express").Router();

// If you have validation middleware, keep these lines:
const { signupValidation, loginValidation } = require("../Middlewares/AuthValidation");

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

// If you do NOT have validation middleware, use this instead:
// router.post("/signup", signup);
// router.post("/login", login);

module.exports = router;
const { ERROR_MESSAGES } = require("../config/appConstants");
const User = require("../models/userSchema");
const { generateToken } = require("../services/token.services");
const { catchAsync } = require("../utils/universalFunction");

const signup = catchAsync(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const data = {
    firstName,
    lastName,
    email,
    password,
  };

  if (req.files) {
    data.profileImage = req.filename;
  }

  if (await User.findOne({ email })) {
    res.render("signup", { error: ERROR_MESSAGES.EMAIL_ALREADY_EXIST });
  }

  const newUser = await User.create(data);

  const token = generateToken(newUser);
  res.cookie("token", token);

  res.redirect("/");
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (!userExist) {
    res.render("login", { error: ERROR_MESSAGES.ACCOUNT_NOT_EXIST });
  }

  if (!(await userExist.isPasswordMatch(password))) {
    res.render("login", { error: ERROR_MESSAGES.INCORRECT_PASSWORD });
  }

  const token = generateToken(userExist);
  res.cookie("token", token);

  res.redirect("/");
});

module.exports = { signup, login };

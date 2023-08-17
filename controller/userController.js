const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const userModels = require("../models/userModels");

//@desc Register a user
// @ route POST /api/users/register
//@acces
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("all are mandatory");
  }
  const userAvailable = await userModels.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already exist");
  }
  // hashpasswrd
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashedpassword", hashedPassword);
  const user = await userModels.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(400);
    throw new Error("user data is invalid");
  }

  console.log(`user created ${user}`);

  res.json({ message: "register the user" });
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all are mandatory");
  }
  const user = await userModels.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("emailm or password is not valid");
  }
});
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};

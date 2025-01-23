const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  //incorrect credentials
  if (err.message === "Incorrect email") {
    errors.email = "Email is not yet registered";
  }

  if (err.message === "Incorrect password") {
    errors.password = "Incorrect password";
  }

  //duplicate error code
  if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60; //3 days
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_SIGNATURE, {
    expiresIn: maxAge,
  });
};

module.exports.signup = async (req, res) => {
  await User.create(req.body)
    .then((user) => {
      const token = createToken(user._id);

      res.status(201).json({
        message: "Signup Successfully",
        token,
        userMetaData: {
          userId: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    })
    .catch((err) => {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(201).json({
      message: "Login Successfully",
      userMetaData: {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

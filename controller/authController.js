const login = () => {};

export const AuthController = {
  login,
};

const signup = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};

  const existingUser = await db.users.findOne({ email });
  if (!existingUser) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const isMatchedPassword = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isMatchedPassword) {
    res.status(400);
    throw new Error("Email or password is not valid");
  }

  const payload = {
    id: existingUser._id,
    email: existingUser.email,
    fullname: existingUser.fullname,
  };

  const SECRET_KEY = process.env.SECRET_KEY;

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });

  res.json({
    message: "Signup successfully",
    accessToken: token,
  });
});

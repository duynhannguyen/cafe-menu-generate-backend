import asyncHandler from "express-async-handler";
import bcrypt, { hash } from "bcrypt";
import { db } from "../config/database.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const exsittingUser = await db.users.findOne({ email });
  if (!exsittingUser) {
    res.status(400);
    throw new Error("Invaid credentials");
  }

  const isMatchedPassword = await bcrypt.compare(
    password,
    exsittingUser.password
  );
  if (!isMatchedPassword) {
    res.status(400);
    throw new Error("Password doesn't match");
  }
  const payload = {
    id: exsittingUser.id,
    email: exsittingUser.email,
    fullname: exsittingUser.fullname,
  };
  const SECRET_KEY = process.env.SECRET_KEY;
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
  res.status(200).json({
    message: "login successfully",
    accessToken: token,
  });
});

const fetchCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const currentUser = await db.users.findOne(
    { _id: new ObjectId(userId) },
    {
      projection: {
        password: 0,
      },
    }
  );

  if (!currentUser) {
    res.status(401);
    throw new Error("Unauthorized, please try again!");
  }

  res.json(currentUser);
});
export const AuthController = {
  login,
  fetchCurrentUser,
};

import * as yup from "yup";

const loginSchema = yup.object().shape({
  usernam: yup
    .string()
    .email(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invaid email address")
    .required("email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/,
      "Password must contain at least one number, one special character, and one uppercase letter"
    )
    .min(8)
    .required("password is required"),
});

const AuthValidatior = {
  loginSchema,
};

export default AuthValidatior;

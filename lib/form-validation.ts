import { z } from "zod";

export const SignUpValidation = z
  .object({
    email: z.string().email("Invalid email address"),
    fullname: z
      .string()
      .min(4, "Name must be at least 4 characters")
      .max(50, "Name must be at most 50 characters"),

    password: z
      .string()
      .min(10, "Password must be at least 10 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirm_password: z
      .string()
      .min(10, "Password must be at least 10 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password and Confirm Password must be the same",
    path: ["confirm_password"],
  });

export const SignInValidation = z.object({
  email: z.string().email("Invalid email address"),
  fullname: z.string().optional(),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

export const AuthValidation = (type: string) => {
  switch (type) {
    case "sign-up":
      return SignUpValidation;
    case "sign-in":
      return SignInValidation;
    default:
      throw new Error("Invalid type");
  }
};

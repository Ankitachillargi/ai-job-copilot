import bcrypt from "bcrypt";
import { pool } from "../db/db";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const registerService = async (email: string, password: string) => {

  const [rows]: any = await pool.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length > 0) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result]: any = await pool.execute(
    "INSERT INTO users (email, password_hash) VALUES (?, ?)",
    [email, hashedPassword]
  );

  return {
    id: result.insertId,
    email
  };
};

export const loginService = async (email: string, password: string) => {

  const [rows]: any = await pool.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  const user = rows[0];

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email
    }
  };
};
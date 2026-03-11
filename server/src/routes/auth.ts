import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const users: any[] = [];

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
     return res.status(400).json({ message: "Пользователь уже существует" });

  }
 
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { id: Date.now(), email, password: hashedPassword };
  users.push(user);

  const token = jwt.sign({ id: user.id }, "SECRET_KEY");
  res.json({ token });
});

router.post("/login", (req, res) => {
  res.json({ message: "login" });
});

export default router;

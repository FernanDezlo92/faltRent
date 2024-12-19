import { Router }  from "express";
import { SECRET_KEY } from "../config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserPgRepository from "../users/infrastructure/UsersPgRepository";
import User from "../users/entity";


const auth = Router();

auth.post("/authenticate", async (req, res) => {
    const { email, password } = req.body;
    try {
      const userRepo = new UserPgRepository();
      const user = await userRepo.findByEmail(email);
  
      if (user) { 
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
          const token = jwt.sign(
            { id: user.id, name: user.name, status: user.status },
            SECRET_KEY,
            { expiresIn: "1h" }
          );
          
          res.cookie("access_token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", 
            maxAge: 3600000
          });
  
          res.json({ status: 200, data: user, redirected: true, url: `/user/${user.id}` });
        } else {
          res.status(401).json({ error: "Invalid email or password" });
        }
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
});


auth.post("/register", async (req, res) => {
    const { name, email, password, status } = req.body;
  
    try {
      const hash = await bcrypt.hash(password, 10);
      const user: Partial<User> = {
        name,
        email,
        password: hash,
        status,
        admin: false,
        type: "regular",
        photo: "",
        created_at: new Date(),
        updated_at: new Date()
      };
  
      const newUser = await new UserPgRepository().create(user as User);
      const { password: _, ...publicUser } = newUser;
  
      res.json({ status: 200, data: publicUser, redirected: true, url: `/login` });
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "User with this name already exists") {
          res.status(400).send({ status: 400, error: "Error creating user" });
        } else {
          res.status(500).send({ status: 500, error: "Internal Server Error" });
        }
      } else {
        res.status(500).send({ status: 500, error: "An unknown error occurred" });
      }
    }
});
  
  
export default auth;
import  { Router }  from "express";
import UserPgRepository from "./infrastructure/UsersPgRepository";
import { authenticateToken } from "../middlewares/authenticateToken";


const userRouter = Router();

userRouter.get("/:id", authenticateToken, async(req, res) => {
    const { id } = req.params;
    if (req.user.id !== Number(id)) {
      return res.status(403).json({ error: "Access denied: You cannot view another user's" });
    }
    try {
      const user = await new UserPgRepository().getById(Number(id));
      const { password: _, ...publicUser } = user;
      res.json(publicUser);
    } catch (error) {
      res.status(500).send({ status: 500, error: "Internal server error" });
    }
  });

  userRouter.put("/:id", authenticateToken, async (req, res) => {
    const { id, name, email, password, status } = req.body;
    
    if (req.user.id !== Number(id)) {
      return res.status(403).json({ error: "Access denied: You cannot modify another user's data" });
    }
  
    try {
      const updatedUser = await new UserPgRepository().update({
        id: Number(id),
        name,
        email,
        password,
        status,
        photo: req.body.photo || "", 
        admin: req.body.admin || false, 
        type: req.body.type || "regular",
        created_at: new Date(),
        updated_at: new Date(),
      });
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).send({ status: 500, error: "Internal server error" });
    }
  });
  
  userRouter.delete("/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    if (req.user.id !== Number(id)) {
      return res.status(403).json({ error: "Access denied: You cannot view another user's" });
    }
    try {
      const user = new UserPgRepository().delete(Number(id));
      res.json(user);
    } catch (error) {
      res.status(500).send({ status: 500, error: "Internal server error" });
    }
  });


export default userRouter;
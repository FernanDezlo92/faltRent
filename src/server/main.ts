import express from "express";
import ViteExpress from "vite-express";
import { config } from "dotenv";
import auth from "./auth/controller";
// import { authenticateToken } from "./middlewares/authenticateToken";
import userRouter from "./users/controllers";
import { setUpDatabase } from "./setUpDataBase";


config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", auth); 
app.use("/api/users", userRouter);


ViteExpress.listen(app, 3000, async() =>
    {
      setUpDatabase();
      console.log("Server is listening on port 3000...");
    }
  );
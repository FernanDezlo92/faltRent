import express from "express";
import ViteExpress from "vite-express";






const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


ViteExpress.listen(app, 3000, async() =>
    {
      
      console.log("Server is listening on port 3000...");
    }
  );
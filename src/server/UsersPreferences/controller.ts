import  { Router }  from "express";
import UsersPreferencesPgRepository from "./infrastructure/UsersPreferencesPgRepository";


const userPreferenceRouter = Router();

userPreferenceRouter.get("/:id", async(req, res) => {
    const { id } = req.params;
    try {
      const userPreference = await new UsersPreferencesPgRepository().getByUserId(Number(id));
      res.json(userPreference);
    } catch (error) {
      res.status(500).send({ status: 500, error: "Internal server error" });
    }
});

userPreferenceRouter.post("/", async(req, res) => {
    const userPreference = req.body;
    try {
      const newUserPreference = await new UsersPreferencesPgRepository().create(userPreference);
      res.json(newUserPreference);
    } catch (error) {
      res.status(500).send({ status: 500, error: "Internal server error" });
    }
});

export default userPreferenceRouter;
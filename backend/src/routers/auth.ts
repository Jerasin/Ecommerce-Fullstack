import { Request, Response, Router } from "express";
import { myDataSource } from "../app-data-source";
import { User } from "../entities";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const router = Router();
const secret = "SecretKey";

const getRepository = (): Repository<User> => myDataSource.getRepository(User);

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  let matchPassword = false;
  const { email, password } = req.body;
  const user = await getRepository().findOne({ where: { email } });

  if (user == null) {
    res.status(404).json({ status: "User Not Found", code: 404 });
    return;
  }

  if (user?.password != null) {
    matchPassword = await bcrypt.compare(password, user?.password);
  }

  if (!matchPassword) {
    res.status(404).json({ status: "Authentication Failed", code: 400 });
    return;
  }

  const token = jwt.sign(
    {
      email: user?.email,
      id: user?.id,
    },
    secret,
    { expiresIn: "30s" }
  );

  res.json({ token });
});

export { router };

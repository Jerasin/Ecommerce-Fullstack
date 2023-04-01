import { Request, Response, Router } from "express";
import { myDataSource } from "../app-data-source";
import { User, UserProps } from "../entities";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { requireJWTAuth } from "../middleware/auth.middleware";

const router = Router();

const getRepository = (): Repository<User> => myDataSource.getRepository(User);

router.get(
  "/",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const users = await getRepository().find();
    res.json(users);
  }
);

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);
  const user = await getRepository().findOne({ where: { id } });

  if (user == null) {
    res.status(404).json({ status: "User Not Found", code: 404 });
    return;
  }

  res.json(user);
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const {
    firstName,
    lastName,
    email,
    status,
    description,
    password,
  }: UserProps = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const user: UserProps = {
    firstName,
    lastName,
    email,
    status,
    description,
    matchName: `${firstName} ${lastName}`,
    password: hashPassword,
    salt,
  };

  try {
    const userProps = getRepository().create(user);
    const result = await getRepository().save(userProps);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ message: e?.message ?? "Unknown Error", code: 400 });
  }
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);
  const user = await getRepository().findOne({ where: { id } });

  if (user == null) {
    res.status(404).json({ status: "User Not Found", code: 404 });
    return;
  }

  const updateProduct = { ...user, ...req.body };

  const result = await getRepository().save(updateProduct);
  res.json(result);
});

export { router };

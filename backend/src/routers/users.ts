import { Request, Response, Router } from "express";
import { myDataSource } from "../app-data-source";
import { User, UserProps } from "../entities";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { requireJWTAuth } from "../middleware/auth.middleware";
import { admin, test } from "../../mock/user";

const router = Router();

const userRepo = (): Repository<User> => myDataSource.getRepository(User);

const createUser = async (props: UserProps): Promise<User> => {
  const { firstName, lastName, email, status, password, role }: UserProps =
    props;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const user: UserProps = {
    firstName,
    lastName,
    email,
    status,
    matchName: `${firstName} ${lastName}`,
    password: hashPassword,
    salt,
    role,
  };

  const userProps = userRepo().create(user);
  const result = await userRepo().save(userProps);
  return result;
};

const findOneUser = async (props: UserProps) => {
  return userRepo().findOne({ where: { email: props.email } });
};

export const initUserAdmin = async () => {
  const user = await findOneUser(admin);
  if (user != null) return;
  return createUser(admin);
};

export const initUser = async () => {
  const user = await findOneUser(test);
  if (user != null) return;
  return createUser(test);
};

router.get(
  "/",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const users = await userRepo().find();
    res.json(users);
  }
);

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);
  const user = await userRepo().findOne({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      status: true,
      img: true,
      address: true,
    },
  });

  if (user == null) {
    res.status(404).json({ status: "User Not Found", code: 404 });
    return;
  }

  res.json(user);
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await createUser(req.body);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ message: e?.message ?? "Unknown Error", code: 400 });
  }
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);
  const user = await userRepo().findOne({ where: { id } });

  if (user == null) {
    res.status(404).json({ status: "User Not Found", code: 404 });
    return;
  }

  console.log("req", req.body);

  user.address = req.body.address;

  console.log("user", user);

  const result = await userRepo().save(user);
  res.json(result);
});

export { router };

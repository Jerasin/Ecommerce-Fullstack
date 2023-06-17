import { Request, Response, Router } from "express";
import { Category, CategoryProps } from "../entities";
import { Repository } from "typeorm";
import { requireJWTAuth } from "../middleware/auth.middleware";
import { countAll, repo } from "./base";

const router = Router();

export const categoryRepo = (): Repository<Category> => {
  return repo(Category);
};

export const createCategory = async (
  props: CategoryProps
): Promise<Category | null> => {
  const findCategory = await findOneCategory(props);

  if (findCategory != null) return null;
  const category = categoryRepo().create(props);
  return categoryRepo().save(category);
};

const findOneCategory = async (
  props: CategoryProps
): Promise<Category | null> => {
  return categoryRepo().findOne({ where: { name: props.name } });
};

router.get(
  "/",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const products = await categoryRepo().find();

    res.json(products);
  }
);

router.get(
  "/count",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const total = await countAll(Category);
    res.json(total);
  }
);

export { router };

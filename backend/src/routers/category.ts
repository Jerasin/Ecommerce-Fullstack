import { Request, Response, Router } from "express";
import { myDataSource } from "../app-data-source";
import { Category, CategoryProps } from "../entities";
import { Repository } from "typeorm";
import { requireJWTAuth } from "../middleware/auth.middleware";

const router = Router();

export const categoryRepo = (): Repository<Category> => {
  return myDataSource.getRepository(Category);
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

export { router };

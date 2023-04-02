import { NextFunction, Request, Response, Router } from "express";
import { myDataSource } from "../app-data-source";
import { Product } from "../entities";
import { Repository } from "typeorm";
import { requireJWTAuth } from "../middleware/auth.middleware";
import { ProductProps } from "../entities";

const router = Router();

const getRepository = (): Repository<Product> => {
  return myDataSource.getRepository(Product);
};

const createProduct = async (props: ProductProps): Promise<Product> => {
  const product = getRepository().create(props);
  return getRepository().save(product);
};

router.get(
  "/",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const products = await getRepository().find();
    res.json(products);
  }
);

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);
  const product = await getRepository().findOne({ where: { id } });

  if (product == null) {
    res.status(404).json({ status: "Product Not Found", code: 404 });
    return;
  }

  res.json(product);
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const result = await createProduct(req.body);

  res.json(result);
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);
  const product = await getRepository().findOne({ where: { id } });

  if (product == null) {
    res.status(404).json({ status: "Product Not Found", code: 404 });
    return;
  }

  const updateProduct = { ...product, ...req.body };

  const result = await getRepository().save(updateProduct);
  res.json(result);
});

export { router };

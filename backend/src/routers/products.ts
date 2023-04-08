import { Request, Response, Router } from "express";
import { myDataSource } from "../app-data-source";
import { Product } from "../entities";
import { Repository } from "typeorm";
import { requireJWTAuth } from "../middleware/auth.middleware";
import { ProductProps } from "../entities";

const router = Router();

export const productRepo = (): Repository<Product> => {
  return myDataSource.getRepository(Product);
};

export const createProduct = async (
  props: ProductProps
): Promise<Product | null> => {
  const findProduct = await findOneProduct(props);

  if (findProduct != null) return null;
  const product = productRepo().create(props);
  return productRepo().save(product);
};

const findOneProduct = async (props: ProductProps): Promise<Product | null> => {
  return productRepo().findOne({ where: { name: props.name } });
};

router.get(
  "/",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const products = await productRepo().find();
    res.json(products);
  }
);

router.get(
  "/:id",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    const product = await productRepo().findOne({ where: { id } });

    if (product == null) {
      res.status(404).json({ status: "Product Not Found", code: 404 });
      return;
    }

    res.json(product);
  }
);

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const result = await createProduct(req.body);

  res.json(result);
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);
  const product = await productRepo().findOne({ where: { id } });

  if (product == null) {
    res.status(404).json({ status: "Product Not Found", code: 404 });
    return;
  }

  const updateProduct = { ...product, ...req.body };

  const result = await productRepo().save(updateProduct);
  res.json(result);
});

export { router };

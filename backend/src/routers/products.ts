import { Request, Response, Router } from "express";
import { Product } from "../entities";
import { FindManyOptions, Repository } from "typeorm";
import { requireJWTAuth } from "../middleware/auth.middleware";
import { ProductProps } from "../entities";
import { countAll, pagination, repo } from "./base";

const router = Router();

export const productRepo = (): Repository<Product> => {
  return repo(Product);
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
    const { page, size } = req.query ?? {};
    const pageNumber = parseInt(page as string);
    const sizeNumber = parseInt(size as string);
    const products = await pagination(Product, pageNumber, sizeNumber, {
      status: true,
    });
    res.json(products);
  }
);

router.get(
  "/count",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const { status } = req.query ?? {};

    let query: FindManyOptions<Product> = {};
    if (status != null) {
      query = {
        where: {
          status: status as any,
        },
      };
    }

    const total = await countAll(Product, query);
    res.json(total);
  }
);

router.get(
  "/productSuggest",
  async (req: Request, res: Response): Promise<void> => {
    const products = await pagination(Product, 1, 5, {
      status: true,
    });
    res.json(products);
  }
);

router.get(
  "/category/:id",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    const { page, size } = req.query ?? {};
    const pageNumber = parseInt(page as string);
    const sizeNumber = parseInt(size as string);

    if (isNaN(pageNumber) || isNaN(sizeNumber)) {
      res.status(400).json({ status: "Query String Error", code: 400 });
    }

    const products = await pagination(Product, pageNumber, sizeNumber, {
      categoryId: id,
      relations: {
        category: true,
      },
    });

    console.log("products", typeof products.data[0].category);

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

router.post(
  "/",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const result = await createProduct(req.body);

    res.json(result);
  }
);

router.put(
  "/:id",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    const product = await productRepo().findOne({ where: { id } });

    if (product == null) {
      res.status(404).json({ status: "Product Not Found", code: 404 });
      return;
    }

    const updateProduct = { ...product, ...req.body };

    const result = await productRepo().save(updateProduct);
    res.json(result);
  }
);

export { router };

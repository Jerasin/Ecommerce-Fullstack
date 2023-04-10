import { Request, Response, Router } from "express";
import { myDataSource } from "../app-data-source";
import { Transaction } from "../entities";
import { Repository } from "typeorm";
import { requireJWTAuth } from "../middleware/auth.middleware";
import { TransactionProps, SaleOrder } from "../entities";

const router = Router();

export const transactionRepo = (): Repository<Transaction> => {
  return myDataSource.getRepository(Transaction);
};

export const createTransaction = async (
  props: TransactionProps
): Promise<Transaction | null> => {
  const transaction = await findOneTransaction(props);
  console.log("props", props);
  console.log("transaction", transaction);

  if (transaction != null) return null;

  const payload = transactionRepo().create(props);
  return transactionRepo().save(payload);
};

export const findOneTransaction = (
  id: TransactionProps
): Promise<Transaction | null> => {
  return transactionRepo()
    .createQueryBuilder("t")
    .where("t.orderId = :orderId", { orderId: id.orderId })
    .getOne();
};

router.get(
  "/",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const transactions = await transactionRepo().find();
    res.json(transactions);
  }
);

router.get(
  "/:id",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const createBy: string = req.params.email;

    const transactions = await transactionRepo().find({ where: { createBy } });

    res.json(transactions);
  }
);

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const result = await createTransaction(req.body);

  res.json(result);
});

export { router };

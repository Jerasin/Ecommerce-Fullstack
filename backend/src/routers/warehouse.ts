import { Request, Response, Router } from "express";
import { myDataSource } from "../app-data-source";
import { Repository } from "typeorm";
import { requireJWTAuth } from "../middleware/auth.middleware";
import { WareHouse, WareHouseProps } from "../entities/warehouse.entity";

const router = Router();

const getRepoWareHouse = (): Repository<WareHouse> =>
  myDataSource.getRepository(WareHouse);

export const createWareHouse = async (
  props: WareHouseProps
): Promise<WareHouse> => {
  const wareHouseProps = getRepoWareHouse().create(props);
  const result = await getRepoWareHouse().save(wareHouseProps);
  return result;
};

router.get(
  "/",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const wareHouses = await getRepoWareHouse().find();
    res.json(wareHouses);
  }
);

export { router };

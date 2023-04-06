import { DataSource } from "typeorm";
import { Product, User, WareHouse } from "./entities";

export const myDataSource = new DataSource({
  type: "mysql",
  host: "db",
  port: 3306,
  username: "api",
  password: "123456",
  database: "api",
  entities: [Product, User, WareHouse],
  logging: false,
  synchronize: true,
});

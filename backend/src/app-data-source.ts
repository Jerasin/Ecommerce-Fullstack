import { DataSource } from "typeorm";
import { Product, User } from "./entities";

export const myDataSource = new DataSource({
  type: "mysql",
  host: "db",
  port: 3306,
  username: "api",
  password: "123456",
  database: "api",
  entities: [Product, User],
  logging: false,
  synchronize: true,
});

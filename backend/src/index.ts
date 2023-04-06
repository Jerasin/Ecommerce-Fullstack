import express, { Express } from "express";
import cors from "cors";
import { myDataSource } from "./app-data-source";
import { router as productRouter, createProduct } from "./routers/products";
import { router as userRouter, initUser } from "./routers/users";
import { router as authRouter } from "./routers/auth";
import passport from "passport";
import { authMiddleware } from "./middleware/auth.middleware";
import { productList } from "../mock/product";
import path from "path";
import { router as uploadRouter } from "./routers/upload";
import {
  router as wareHouseRouter,
  createWareHouse,
} from "./routers/warehouse";
import { wareHouseList } from "../mock/warehouse";

const app: Express = express();
const port = 3000;
const imgPath = path.join(__dirname, "../../src/images");

app.use(cors());
app.use(express.json());
app.use("/images", express.static(imgPath));
passport.use(authMiddleware());

myDataSource
  .initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    await initUser();

    await Promise.all(
      productList.map(async (item) => {
        await createProduct(item);
      })
    );

    await Promise.all(
      wareHouseList.map(async (item) => {
        await createWareHouse(item);
      })
    );
  })
  .catch((e: any) => {
    console.error("Error during Data Source initialization:", e);
  });

app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/upload", uploadRouter);
app.use("/wareHouse", wareHouseRouter);

app.listen(port, () => {
  console.log("imgPath", imgPath);
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

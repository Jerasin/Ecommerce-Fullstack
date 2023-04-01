import express, { Express } from "express";
import cors from "cors";
import { myDataSource } from "./app-data-source";
import { router as productRouter } from "./routers/products";
import { router as userRouter } from "./routers/users";
import { router as authRouter } from "./routers/auth";
import passport from "passport";
import { authMiddleware } from "./middleware/auth.middleware";

const app: Express = express();
const port = 3000;

app.use(cors());
app.use(express.json());
passport.use(authMiddleware());

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((e) => {
    console.error("Error during Data Source initialization:", e);
  });

app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

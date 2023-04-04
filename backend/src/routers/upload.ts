import { NextFunction, Request, Response, Router } from "express";
import formidable from "formidable";
import fs from "fs";

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json({ status: "failed", message: "upload file failed" });
    }

    console.log("fields", fields);
    console.log("files", files);
  });
});

export { router };

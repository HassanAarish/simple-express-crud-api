import express, { Router } from "express";
import {
  addBook,
  all,
  deleteBook,
  getOneBook,
  updateBook,
} from "../controller/controller.js";

const route = express.Router();

route.get("/", all);

route.get("/:id", getOneBook);

route.post("/add-book", addBook);

route.put("/:id", updateBook);

route.delete("/:id", deleteBook);

export default route;

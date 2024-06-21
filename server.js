import express from "express";
import route from "./routes/books.js";

const app = express();
const port = 5001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", route);

app.listen(port, () => {
  console.log(`The server is successfully running on port ${port}`);
});

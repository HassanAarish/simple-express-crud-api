import express from "express";
import route from "./routes/books.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const port = 5001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", route);

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5001/api/v1",
      },
    ],
  },
  apis: ["./routes/books.js"], // Path to your book.js route file
};

// Generate Swagger specification
const specs = swaggerJsdoc(options);

// Serve Swagger documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.listen(port, () => {
  console.log(`The server is successfully running on port ${port}`);
});

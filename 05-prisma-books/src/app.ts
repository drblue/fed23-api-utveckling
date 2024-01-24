import express from "express";
import morgan from "morgan";
import routes from "./routes";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// Use dem routes
app.use(routes);

export default app;

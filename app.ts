import express from "express";

import usersRouter from "./routes/users";
import pizzaRouter from "./routes/pizzas";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/pizzas", pizzaRouter);

export default app;

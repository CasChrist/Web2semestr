import express from "express";
import { coffeeController } from "./controller/coffeeController";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/coffees", coffeeController);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

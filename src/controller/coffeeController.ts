import { Router, Request, Response } from "express";
import Coffee from "../model/coffee";

const router = Router();

const coffees: Coffee[] = [];

router
  .get("/", (req: Request, res: Response) => {
    res.json(coffees);
  })
  .post("/", (req: Request, res: Response) => {
    try {
      const { id, name } = req.body;
      const coffee = new Coffee(id, name);
      coffees.push(coffee);
      res.status(201).json(coffee);
    } catch {
      res.status(400).send();
    }
  })
  .delete("/:id", (req: Request, res: Response) => {
    const coffeeId = Number(req.params.id);
    const coffeeIndex = coffees.findIndex((c) => c.id === coffeeId);
    if (coffeeIndex == -1) {
      res.status(404).json({ error: "Coffee not found :(" });
    } else {
      coffees.splice(coffeeIndex, 1);
      res.status(204).send();
    }
  })
  .get("/:id", (req: Request, res: Response) => {
    const coffeeId = Number(req.params.id);
    const coffee = coffees.find((c) => c.id === coffeeId);
    if (coffee != undefined) {
      res.status(200).json(coffee);
    } else {
      res.status(404).json({ error: "Coffee not found :(" });
    }
  });

export const coffeeController = router;

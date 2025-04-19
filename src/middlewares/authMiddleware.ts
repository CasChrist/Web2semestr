import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Расширяем интерфейс Request, чтобы добавить свойство userId
declare module "express" {
  interface Request {
    id?: string;
  }
}

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Получаем токен из заголовка Authorization
  const token = req.header("Authorization")?.split(" ")[1];

  // Если токен отсутствует, возвращаем ошибку 401
  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Верифицируем токен
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as {
      id: string;
    };

    // Добавляем id в объект запроса
    req.id = decoded.id;

    // Переходим к следующему middleware
    next();
  } catch {
    // Если токен невалиден, возвращаем ошибку 400
    res.status(400).json({ message: "Invalid token." });
  }
};

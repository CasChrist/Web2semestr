import { Request, Response } from "express";
import { UserModel } from "../models/user";

const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserModel.findById(req.id).select("username role");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: (error as Error).message || "Internal Server Error" });
  }
};

export const userController = {
  getProfile,
};
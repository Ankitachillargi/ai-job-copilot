import { Request, Response } from "express";
import { registerService,loginService } from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;

    const user = await registerService(email, password);

    res.status(201).json({
      success: true,
      data: user
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;

    const result = await loginService(email, password);

    res.json({
      success: true,
      data: result
    });

  } catch (error: any) {

    res.status(401).json({
      success: false,
      message: error.message
    });

  }
};
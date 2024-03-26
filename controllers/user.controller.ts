import { Request, Response } from "express";
export function login(req: Request, res: Response) {
  res.json({ hello: "world" });
}
export function logout(req: Request, res: Response) {
  res.json({ hello: "world" });
}

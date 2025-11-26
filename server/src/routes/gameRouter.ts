import { Router } from "express";
import { resultMoves } from "../services/gameService";

export const gameRouter = Router();

gameRouter.post("/resultMoves", resultMoves);

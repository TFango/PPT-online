import { Request, Response } from "express";
import { firestore, rtdb } from "./firebase";

type Move = "piedra" | "papel" | "tijera";

export function determineWinner(me: Move, op: Move) {
  const win: Record<Move, Move> = {
    piedra: "tijera",
    tijera: "papel",
    papel: "piedra",
  };

  if (me === op) return "tie";
  return win[me] === op ? "user" : "opponent";
}

export async function resultMoves(req: Request, res: Response) {
  const { userChoice, opponentChoice } = req.body;

  if (!userChoice || !opponentChoice) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const win = determineWinner(userChoice, opponentChoice);

  return res.status(200).json({
    win,
  });
}

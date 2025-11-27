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
  const { roomIdCorto, userChoice, opponentChoice, playerRole } = req.body;

  if (!roomIdCorto || !userChoice || !opponentChoice) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  // 1) Determinar ganador
  const win = determineWinner(userChoice, opponentChoice);

  // 2) Obtener doc de la sala en Firestore
  const roomRef = firestore.collection("rooms").doc(roomIdCorto);
  const roomSnap = await roomRef.get();

  if (!roomSnap.exists) {
    return res.status(400).json({ error: "La sala no existe" });
  }

  const roomData = roomSnap.data();

  // 3) Preparar score inicial
  let score = roomData?.score || { owner: 0, guest: 0 };

  // 4) Actualizar score según ganador
  if (win !== "tie") {
    if (win === "user") {
      // Ganó el jugador que mandó el request
      if (playerRole === "owner") score.owner++;
      else score.guest++;
    } else {
      // Ganó el oponente del que mandó el request
      if (playerRole === "owner") score.guest++;
      else score.owner++;
    }
    // 5) Guardar score en Firestore
    await roomRef.update({ score });
  }
  // 6) Devolver resultado y score global
  return res.status(200).json({
    win,
    score,
  });
}

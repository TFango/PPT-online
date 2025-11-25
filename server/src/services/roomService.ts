import { Timestamp } from "@google-cloud/firestore";
import { firestore, rtdb } from "./firebase";
import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { error } from "console";

const roomCollection = firestore.collection("rooms");

// Funcion  para crear una nueva sala de juego
export async function createRoom(req: Request, res: Response) {
  const { userName } = req.body; // Obtien el nombre de usuario del cuerpo de la solicitud

  if (!userName) return res.status(400).json({ error: "userName requerido" });

  const roomIdReal = nanoid();
  const roomIdCorto = nanoid(6);
  const userId = nanoid(5);

  try {
    // Crea el documento de la sala en Firestore
    await roomCollection.doc(roomIdReal).set({
      owner: userName,
      roomIdReal,
      roomIdCorto,
      createdAt: Timestamp.now(),
    });

    // Crea la referencia del jugador en la base de datos en tiempo real
    const roomRef = rtdb.ref(`rooms/${roomIdReal}/currentGame/${userId}`);
    await roomRef.set({
      name: userName,
      choice: "",
      start: false,
      online: true,
    });

    return res.json({
      roomIdReal,
      roomIdCorto,
      userId,
    });
  } catch (err) {
    console.error("Error creando sala: ", err);
    return res.status(500).json({ error: "Error interno al crear la sala" });
  }
}

export async function joinRoom(req: Request, res: Response) {
  const { roomIdCorto, userName } = req.body;

  if (!roomIdCorto || !userName) {
    return res.status(400).json({ error: "faltan datos para la operaciones" });
  }

  const roomSnap = await roomCollection.doc(roomIdCorto).get(); // Busca la sala en FireStore con el codigo corto
  if (!roomSnap.exists) {
    // Si la sala no existe devuelve error
    return res.status(404).json({ error: "la sala no existe" });
  }

  // Obtiene el ID real de la sala de RTDB desde FireStore
  const { rtdbRoomId } = roomSnap.data() as { rtdbRoomId: string };

  const playersRef = rtdb.ref(`rooms/${rtdbRoomId}`); // Crea referencia a los jugador en RTDB
  const playersSnap = await playersRef.get(); // Obtiene los jugadores actuales
  const players = playersSnap.val() || {};

  const playerCount = Object.keys(players).length; // Cuenta cuantos jugadores hay

  if (playerCount >= 2) {
    // Si hay 2 o mas, la sala esta llena
    return res.status(409).json({ error: "la sala esta llena" });
  }

  const nameAlreadyTaken = Object.values(players).some(
    // Verifica si el nombre ya esta en uso
    (p: any) => p.name === userName
  );

  if (nameAlreadyTaken) {
    return res.status(409).json({ error: "ese nombre ya esta en uso" });
  }

  const userId = nanoid(5); // Genera un nuevo Id unico para el jugador

  await playersRef.set({
    // Agrega el nuevo jugador a la sala en RTDB
    [userId]: {
      name: userName,
      start: false,
      choice: "",
      online: true,
    },
  });

  return res.json({
    userId,
    roomIdReal: rtdbRoomId,
    roomIdCorto,
  });
}

export async function setStart(req: Request, res: Response) {
  const { roomIdReal, userId } = req.body;

  if (!roomIdReal || !userId) {
    return res.status(400).json({ error: "faltan datos para la operacion" });
  }

  try {
    const playerRef = rtdb.ref(`rooms/${roomIdReal}/currentGame/${userId}`); // Crea referencia al jugador especifico en la RTDB

    const snap = await playerRef.get(); // Verifica que el jugador exista
    if (!snap.exists()) {
      return res.status(404).json({ error: "No se encontro al jugador" });
    }

    await playerRef.update({
      // actualiza el estado a listo
      start: true,
    });

    return res.status(200).json({
      message: "Start seteado correctamente",
    });
  } catch (err) {
    return res.status(500).json({ error: "Error interno al cambiar start" });
  }
}

// export async function checkBothStarted(req: Request, res: Response) {
//   const { roomIdReal } = req.body;

//   if (!roomIdReal) {
//     return res.status(400).json({ error: "falta el roomIdReal" });
//   }

//   try {
//     const playerSnap = await rtdb.ref(`rooms/${roomIdReal}/currentGame`).get(); // Crea referencia a TODOS los jugadores de la sala

//     if (!playerSnap.exists()) {
//       return res.status(404).json({ error: "La sala no existe" });
//     }
//     const players = playerSnap.val(); // Obtiene los datos de todos los jugadores
//     const playerCount = Object.keys(players); // Obtiene los IDs de los jugadores (array de strings)

//     if (playerCount.length < 2) {
//       return res.status(409).json({ error: "Faltan jugadores en la sala" });
//     }

//     const bothStarted = playerCount.every((id) => players[id].start === true); // Verifica si TODOS los jugadores tiene start: true

//     return res.json({ bothStarted }); // Devuelve el resultado de la verificacion
//   } catch (err) {
//     return res.status(500).json({ error: "Error interno chechBothStarted" });
//   }
// }

export async function setChoice(req: Request, res: Response) {
  const { roomIdReal, userId, choice } = req.body;

  if (!roomIdReal || !userId || !choice) {
    return res.status(400).json({ error: "faltan datos" });
  }

  try {
    const roomRef = rtdb.ref(`rooms/${roomIdReal}`);
    const roomSnap = await roomRef.get();

    if (!roomSnap.exists()) {
      return res.status(404).json({ error: "La sala no existe" });
    }

    const userRef = rtdb.ref(`rooms/${roomIdReal}/currentGame/${userId}`);
    const userSnap = await userRef.get();

    if (!userSnap.exists()) {
      return res.status(404).json({ error: "El usuario no existe" });
    }

    await userRef.update({
      choice: choice,
    });

    return res.status(200).json({ message: "Choice seteado con existo" });
  } catch (err) {
    return res.status(500).json({ error: "Error interno el setear choise" });
  }
}

// export async function checkBothChoices(req: Request, res: Response) {
//   const { roomIdReal } = req.body;

//   if (!roomIdReal) {
//     return res.status(400).json({ error: "falta el roomIdReal" });
//   }

//   try {
//     const snap = await rtdb.ref(`rooms/${roomIdReal}/currentGame`).get();

//     if (!snap.exists()) {
//       return res.status(404).json({ error: "La sala no existe" });
//     }

//     const players = snap.val();
//     const playerIds = Object.keys(players);

//     if (playerIds.length < 2) {
//       return res.status(409).json({ error: "Faltan jugadores en la sala" });
//     }

//     const bothChoice = playerIds.every((id) => {
//       const c = players[id].choice;
//       return c !== "" && c !== undefined && c !== null;
//     });

//     return res.json({ bothChoice });
//   } catch (err) {
//     return res.status(500).json({ error: "Error interno chechBothStarted" });
//   }
// }

export async function resetRounder(req: Request, res: Response) {
  const { roomIdReal } = req.body;

  if (!roomIdReal) {
    return res.status(400).json({ error: "falta roomIdReal" });
  }

  try {
    const baseRef = rtdb.ref(`rooms/${roomIdReal}/currentGame`);
    const snap = await baseRef.get();

    if (!snap.exists()) {
      return res.status(404).json({ error: "la sala no existe" });
    }
    const players = snap.val();

    const updates = Object.entries(players).map((playerId) => {
      const playerRef = rtdb.ref(`rooms/${roomIdReal}/currentGame/${playerId}`);
      return playerRef.update({
        choice: "",
        start: false,
      });
    });

    await Promise.all(updates);

    return res.status(200).json({ message: "Reinicio completado" });
  } catch (err) {
    return res.start(500).json({ error: "Error interno al ejecutar reinicio" });
  }
}

import { Router } from "express";
import {
  createRoom,
  joinRoom,
  setStart,
  setChoice,
  resetRounder,
} from "../services/roomService";

export const roomRouter = Router();

roomRouter.post("/createRoom", createRoom);
roomRouter.post("/joinRoom", joinRoom);
roomRouter.post("/setStart", setStart);
roomRouter.post("/setChoice", setChoice);
roomRouter.post("/resetRounder", resetRounder);

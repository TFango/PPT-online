"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameRouter = void 0;
const express_1 = require("express");
const gameService_1 = require("../services/gameService");
exports.gameRouter = (0, express_1.Router)();
exports.gameRouter.post("/resultMoves", gameService_1.resultMoves);

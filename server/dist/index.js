"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const roomRouter_1 = require("./routes/roomRouter");
const gameRouter_1 = require("./routes/gameRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const publicPath = path_1.default.join(__dirname, "../dist_front");
app.use(express_1.default.static(publicPath));
app.use("/room", roomRouter_1.roomRouter);
app.use("/game", gameRouter_1.gameRouter);
app.get(/.*/, (req, res) => {
    res.sendFile(path_1.default.join(publicPath, "index.html"));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

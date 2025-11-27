import express from "express";
import cors from "cors";
import path from "path";

import { roomRouter } from "./routes/roomRouter";
import { gameRouter } from "./routes/gameRouter";

const app = express();

app.use(express.json());
app.use(cors());

// const publicPath = path.join(__dirname, "../dist_front");
// app.use(express.static(publicPath));

app.use("/room", roomRouter);
app.use("/game", gameRouter);

// app.get(/.*/, (req, res) => {
//   res.sendFile(path.join(publicPath, "index.html"));
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

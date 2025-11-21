import { onValue, ref } from "firebase/database";
import { db } from "../services/firebase";

type Move = "piedra" | "papel" | "tijera"; //Definje los movimiento validos del juego
type Winner = "me" | "opponent" | "tie"; //Define los resultados del juego

type RtdbPlayer = {
  // Estructura para un jugador en la base de datos
  name: string;
  online: boolean;
  start: boolean;
  choice?: Move;
};

type RtdbGame = {
  //Estructura del juego en la base de datos
  [userId: string]: {
    //Mapea cada usuario por su ID
    choice?: Move;
    start: boolean;
    online: boolean;
    name: string;
  };
};

type Score = { me: number; opponent: number }; // Estructura para llevar el puntaje
const GAME_KEY = "date";

export const state = {
  // Exporta el objeto de estado principal
  data: {
    userName: "",
    userId: "",
    roomIdReal: "",
    roomIdCorto: "",

    owner: false,

    rtdbData: {
      // Datos de la base de datos en tiempo real
      players: {} as Record<string, RtdbPlayer>, // Jugadores
      game: {} as RtdbGame, // Estado del juego
    },

    currentChoice: "" as Move | "",
    opponentChoice: "" as Move | "",
    winner: "" as Winner | "",

    score: {
      me: 0,
      opponent: 0,
    } as Score,
  },
  listeners: [] as Array<() => void>,

  init() {
    // Metodo para inicializar el estado cargando datos guardados
    const save = localStorage.getItem(GAME_KEY); // Obtiene los datos guardados del localStorage

    if (save) {
      // Si exisisten datos guardados...
      const parsed = JSON.parse(save); // Convierte el texto JSON a objeto javaScript

      this.data.userName = parsed.userName || "";
      this.data.userId = parsed.userId || "";
      this.data.roomIdReal = parsed.roomIdReal || "";
      this.data.roomIdCorto = parsed.roomIdCorto || "";
      this.data.owner = parsed.owner || false;

      this.data.score = parsed.score || { me: 0, opponent: 0 };
    }
  },
  getState() {
    // Devuelve el estado actual completo
    return this.data;
  },
  setState(newState: Partial<typeof this.data>) {
    // Actualiza el estado con nuevos datos : Partial<> permite pasar solo lo que queres actualizar
    this.data = {
      // Combina el estado actual con el nuevo estado
      ...this.data, // Copia todo lo que hay en data
      ...newState, //  Sobrescribe con los nuevos datos
    };
    const persist = {
      // Prepara los datos que se guardaran permanentemente
      userName: this.data.userName,
      userId: this.data.userId,
      roomIdReal: this.data.roomIdReal,
      roomIdCorto: this.data.roomIdCorto,
      owner: this.data.owner,
      score: this.data.score,
    };

    localStorage.setItem(GAME_KEY, JSON.stringify(persist)); // Guarda en el almacenamiento local del navegador

    for (const cb of this.listeners) {
      // Ejecuta todas las funciones de callbck registradas
      cb();
    }
  },
  subscribe(callbakc: () => void) {
    // Registra una funcion para ser notificada cuando cambie el estado
    this.listeners.push(callbakc);
  },
  //Gracias es ta funcion, los calculos para saber la eleccion de cada jugador son mas faciles, ya que en la base de datos son datos crudos, esto los convierte en datos utiles
  async computeDerivedData() {
    // Calcula datos derivados del estado actual
    const cs = this.getState();
    const myId = cs.userId;

    const players = cs.rtdbData.game; // Obtiene los datos del juegador

    const opponentId = Object.keys(players).find((id) => id !== myId); // Encuentra el ID del oponente (el que no sea yo)

    const opponentChoice = opponentId ? players[opponentId]?.choice || "" : ""; // Obtiene la eleccion del oponente si existe

    this.setState({
      // Actualiza el estado con las elecciones
      currentChoice: players[myId]?.choice || "", // Mi eleccion
      opponentChoice: opponentChoice, // Eleccion del oponente
    });
  },
  async listernRTDB() {
    // Escucha cambios en la base de datos en tiempo real
    const cs = this.getState();
    const roomId = cs.roomIdReal; // Toma el ID de la sala

    if (!roomId) {
      console.error("No hay roomIdReal. No se puede escuchar la RTDB");
    }

    const roomRef = ref(db, "rooms/" + roomId + "/currentGame"); // Crea referencia a la unicacion en la base de datos

    onValue(roomRef, (snapshot) => {
      // Escucha cambios en esa ubicacion
      const data = snapshot.val(); // Obtiene los datos nuevos

      if (!data) return; // Si no hay datos, no hace nada

      this.setState({
        //Actualiza el estado con los datos nuevos
        rtdbData: {
          players: data.players || {}, // Datos de jugadores
          game: data || {}, // Datos del juego
        },
      });

      this.computeDerivedData(); // Recalcula datos derivados con la nueva informacion
    });
  },
  async createRoom(userName: string) { // Crea una nueva sala de juego
    if (!userName) {
      console.error("createRoom llamado sin nombre");
      throw new Error("Nombre requerido");
    }

    const res = await fetch("/api/createRoom", { // Envia solicitud al servidor para crear sala
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName }),
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json(); // Convierte la respuesta a JSON

    this.setState({ // Actualiza el estado con los datos de la nueva sala
      userName,
      userId: data.userId,
      roomIdReal: data.roomIdReal,
      roomIdCorto: data.roomIdCorto,
      owner: true,
    });
  },
  async joinRoom(roomCode: string, userName: string) { // Une a un usuario a una sala existente
    if (!roomCode || !userName) {
      console.error("faltan datos en joinRoom");
      throw new Error("roomCode y userName requeridos");
    }

    const res = await fetch("/api/joinRoom", { // Envia solicitud para unirse a la sala
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomCode, userName }),
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();

    if (!data.userId || !data.roomIdReal || !data.roomIdCorto) { // Verifica que la respuesta tenga los datos necesarios
      console.error("joinRoom: respuesta invalida del backend: ", data);
      throw new Error("Respuesta invalida del servidor");
    }

    this.setState({ // Actualiza el estado con los datos de la sala
      userName,
      userId: data.userId,
      roomIdReal: data.roomIdReal,
      roomIdCorto: data.roomIdCorto,
      owner: false,
    });
  },
};

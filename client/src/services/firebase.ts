import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA9SR8vJMmCzgM2WoUctQMp5GyBQ1J-9B4",
  authDomain: "ppt-online-de510.firebaseapp.com",
  databaseURL: "https://ppt-online-de510-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
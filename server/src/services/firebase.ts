import * as admin from "firebase-admin";
import "dotenv/config";

admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  } as any),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const firestore = admin.firestore();
export const rtdb = admin.database();

import { playLayout } from "../layouts/playLayout";
import { createHands } from "../components/hands";
import { createCount } from "../components/count";
import { state } from "../store/state";
import { goTo } from "../router/router";

export function playPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = playLayout();
  root.appendChild(view);

  let myMove: "piedra" | "papel" | "tijera" | "" = "";
  let navigate = false;
  let sentMove = false; // ← evita enviar dos veces

  const slotHands = view.querySelector<HTMLDivElement>("#slot-hands");
  if (slotHands) {
    const hands = createHands((move) => {
      myMove = move;
    });
    slotHands.replaceWith(hands.el);
  }

  const slotCount = view.querySelector<HTMLDivElement>("#slot-count");
  if (slotCount) {
    const startCount = createCount();
    slotCount.replaceWith(startCount.el);

    startCount.el.addEventListener("done", async () => {
      console.log("Termino el contador");

      if (!myMove) {
        goTo("/playPage");
        return;
      }

      if (!sentMove) {
        sentMove = true;
        await state.sendChoice(myMove);
      }
    });

    startCount.start(3000);
  }

  const unsubscribe = state.subscribe(async () => {
    if (navigate) return;

    const cs = state.getState();
    const players = cs.rtdbData.game;

    const my = players[cs.userId];
    const opponentId = Object.keys(players).find((id) => id !== cs.userId);
    const opponent = opponentId ? players[opponentId] : null;

    if (!opponent) return;

    if (my.choice && opponent.choice) {
      if (!cs.currentChoice || !cs.opponentChoice) {
        console.log("⏳ Aún no están ambas elecciones, esperando...");
        return;
      }

      navigate = true;

      await state.saveMatchResult();
      unsubscribe();
      goTo("/wachIconPage");
    }
  });
}

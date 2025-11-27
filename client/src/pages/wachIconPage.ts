import { wachIconLayout } from "../layouts/wachIconLayout";
import { createMoveIcon } from "../components/moveIcon";
import { goTo } from "../router/router";
import { state } from "../store/state";
import { Move } from "../components/hands";

export function wachIconPage(root: HTMLElement) {
  root.innerHTML = "";

  const cs = state.getState();

  if (!cs.currentChoice || !cs.opponentChoice) {
    console.warn("Faltan elecciones, vuelvo a playPage");
    goTo("/playPage");
    return;
  }

  const view = wachIconLayout();
  root.appendChild(view);

  const slotOpponent = view.querySelector<HTMLDivElement>("#slot-opponent");
  if (slotOpponent) {
    const startOpponent = createMoveIcon({
      move: cs.opponentChoice as Move,
      role: "opponent",
    });
    slotOpponent.replaceWith(startOpponent.el);
  }

  const slotMe = view.querySelector<HTMLDivElement>("#slot-me");
  if (slotMe) {
    const startMe = createMoveIcon({
      move: cs.currentChoice as Move,
      role: "me",
    });
    slotMe.replaceWith(startMe.el);
  }

  setTimeout(() => {
    goTo("/resultPage");
  }, 2000);
}

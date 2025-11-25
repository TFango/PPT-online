import { wachIconLayout } from "../layouts/wachIconLayout";
import { createMoveIcon } from "../components/moveIcon";
import { goTo } from "../router/router";

export function wachIconPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = wachIconLayout();
  root.appendChild(view);

  const slotOpponent = view.querySelector<HTMLDivElement>("#slot-opponent");
  if (slotOpponent) {
    const startOpponent = createMoveIcon({ move: "piedra", role: "opponent" });
    slotOpponent.replaceWith(startOpponent.el);
  }

  const slotMe = view.querySelector<HTMLDivElement>("#slot-me");
  if (slotMe) {
    const startMe = createMoveIcon({ move: "papel", role: "me" });
    slotMe.replaceWith(startMe.el);
  }

  setTimeout(() => {
    goTo("/resultPage");
  }, 2000);
}

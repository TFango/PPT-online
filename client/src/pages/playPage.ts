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

  const slotHands = view.querySelector<HTMLDivElement>("#slot-hands");
  if (slotHands) {
    const hands = createHands((move) => {
      myMove = move;
      console.log("Elegiste: ", move);
    });
    slotHands.replaceWith(hands.el);
  }

  const slotCount = view.querySelector<HTMLDivElement>("#slot-count");
  if (slotCount) {
    const startCount = createCount();
    slotCount.replaceWith(startCount.el);

    startCount.el.addEventListener("done", () => {
      console.log("Termino el contador");

      if (!myMove) {
        console.log("No elegiste → pierde automáticamente");
        state.sendChoice("papel"); // definimos qué hacer si no elige
      } else {
        state.sendChoice(myMove);
      }
    });
    startCount.start(3000);
  }

  setTimeout(() => {
    goTo("/wachIconPage");
  }, 3000);
}

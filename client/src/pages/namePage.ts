import { nameLayout } from "../layouts/nameLayout";
import { goTo } from "../router/router";
import { createButton } from "../components/button";
import { createTitle } from "../components/title";
import { createLogos } from "../components/logos";
import { state } from "../store/state";

export function namePage(root: HTMLElement) {
  root.innerHTML = "";

  const view = nameLayout();
  root.appendChild(view);

  const slotTile = view.querySelector<HTMLDivElement>("#slot-title");
  if (slotTile) {
    const startTile = createTitle({
      text: "Piedra Papel o Tijera",
      id: "slotTile",
      className: "name-titleNotMargin",
    });
    slotTile.replaceWith(startTile.el);
  }

  const slotBtn = view.querySelector<HTMLDivElement>("#slotBtn");
  if (slotBtn) {
    const startBtn = createButton(
      { text: "Empezar", id: "slotBtn" },
      async () => {
        const input = view.querySelector(".name-input") as HTMLInputElement;
        const name = input.value.trim();

        if (!name) return alert("¡Es necesario ingresar un nombre!");

        const cs = state.getState();

        try {
          if (cs.roomIdCorto) {
            await state.joinRoom(cs.roomIdCorto, name);
          } else {
            await state.createRoom(name);
          }
          state.listenRTDB();
          goTo("/lobbyPage");
        } catch (err) {
          console.error(err);
          goTo("/errPage");
        }
      }
    );
    slotBtn.replaceWith(startBtn.el);
  }

  const slotLogos = view.querySelector<HTMLDivElement>("#slot-logos");
  if (slotLogos) {
    const startLogos = createLogos();
    slotLogos.replaceWith(startLogos.el);
  }
}

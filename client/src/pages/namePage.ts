import { nameLayout } from "../layouts/nameLayout";
import { goTo } from "../router/router";
import { createButton } from "../components/button";
import { createTitle } from "../components/title";
import { createLogos } from "../components/logos";

export function namePage(root: HTMLElement) {
  root.innerHTML = "";

  const view = nameLayout();
  root.appendChild(view);

  const slotTile = view.querySelector<HTMLDivElement>("#slot-title");
  if (slotTile) {
    const startTile = createTitle({
      text: "Piedra Papel o Tijera",
      id: "slotTile",
      className: "name-titleNotMargin"
    });
    slotTile.replaceWith(startTile.el);
  }

  const slotBtn = view.querySelector<HTMLDivElement>("#slotBtn");
  if (slotBtn) {
    const startBtn = createButton({ text: "Empezar", id: "slotBtn" }, () => {
      goTo("/lobbyPage");
    });
    slotBtn.replaceWith(startBtn.el);
  }

  const slotLogos = view.querySelector<HTMLDivElement>("#slot-logos");
  if (slotLogos) {
    const startLogos = createLogos();
    slotLogos.replaceWith(startLogos.el);
  }
}

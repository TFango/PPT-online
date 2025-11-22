import { welcomeLayout } from "../layouts/welcomeLayout";
import { goTo } from "../router/router";
import { createLogos } from "../components/logos";
import { createButton } from "../components/button";
import { createTitle } from "../components/title";

export function welcomePage(root: HTMLElement) {
  root.innerHTML = "";

  const view = welcomeLayout();
  root.appendChild(view);

  const slotTitle = view.querySelector<HTMLDivElement>("#slot-title");
  if (slotTitle) {
    const startTile = createTitle({
      text: "Piedra papel o Tijera",
      id: "slotTile",
    });
    slotTitle.replaceWith(startTile.el);
  }

  const slotBtnNewRoom = view.querySelector<HTMLDivElement>(
    "#slotButton-newRoom"
  );
  if (slotBtnNewRoom) {
    const startBtn = createButton(
      { text: "Nuevo Juego", id: "slotBtnNewRoom" },
      () => {
        goTo("/namePage");
      }
    );
    slotBtnNewRoom.replaceWith(startBtn.el);
  }

  const slotBtnConnectRoom = view.querySelector<HTMLDivElement>(
    "#slotButton-connectRoom"
  );
  if (slotBtnConnectRoom) {
    const startBtn = createButton(
      { text: "Ingresar a una sala", id: "slotBtnConnectRoom" },
      () => {
        goTo("/codePage");
      }
    );
    slotBtnConnectRoom.replaceWith(startBtn.el);
  }

  const slotLogos = view.querySelector<HTMLDivElement>("#slot-logos");
  if (slotLogos) {
    const logos = createLogos();
    slotLogos.replaceWith(logos.el);
  }
}

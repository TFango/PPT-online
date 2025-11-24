import { lobbyLayout } from "../layouts/lobbyLayout";
import { goTo } from "../router/router";
import { createLogos } from "../components/logos";

export function lobbyPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = lobbyLayout();
  root.appendChild(view);

  const slotLogos = view.querySelector<HTMLDivElement>("#slot-logos");
  if (slotLogos) {
    const startLogos = createLogos();
    slotLogos.replaceWith(startLogos.el);
  }
}

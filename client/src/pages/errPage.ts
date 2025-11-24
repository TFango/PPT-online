import { errLayout } from "../layouts/errLayout";
import { createTitle } from "../components/title";
import { createLogos } from "../components/logos";

export function errPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = errLayout();
  root.appendChild(view);

  const slotTitle = view.querySelector<HTMLDivElement>("#slot-title");
  if (slotTitle) {
    const startTitle = createTitle({ text: "Piedra Papel o Tijera" });
    slotTitle.replaceWith(startTitle.el);
  }

  const slotLogos = view.querySelector<HTMLDivElement>("#slot-logos");
  if (slotLogos) {
    const startLogos = createLogos();
    slotLogos.replaceWith(startLogos.el);
  }
}

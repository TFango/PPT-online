import { codeLayout } from "../layouts/codeLayout";
import { goTo } from "../router/router";
import { createButton } from "../components/button";
import { createTitle } from "../components/title";
import { createLogos } from "../components/logos";

export function codePage(root: HTMLElement) {
  root.innerHTML = "";

  const view = codeLayout();
  root.appendChild(view);

  const slotTitle = view.querySelector<HTMLDivElement>("#slot-title");
  if (slotTitle) {
    const startTitle = createTitle({ text: "Piedra Papel o Tijera" });
    slotTitle.replaceWith(startTitle.el);
  }

  const slotButton = view.querySelector<HTMLDivElement>("#slot-Btn");
  if (slotButton) {
    const startBtn = createButton({ text: "Ingresar a la sala" }, () => {
      goTo("#/namePage");
    });
    slotButton.replaceWith(startBtn.el);
  }

  const slotLogos = view.querySelector<HTMLDivElement>("#slot-logos");
  if (slotLogos) {
    const strartLogos = createLogos();
    slotLogos.replaceWith(strartLogos.el);
  }
}

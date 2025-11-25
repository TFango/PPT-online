import { waitingLayout } from "../layouts/waitingLayout";
import { goTo } from "../router/router";
import { state } from "../store/state";
import { createHeader } from "../components/header";
import { createLogos } from "../components/logos";

export function waitingPage(root: HTMLElement) {
  root.innerHTML = "";
  const cs = state.getState();

  const view = waitingLayout();
  root.appendChild(view);

  let startHeader: ReturnType<typeof createHeader> | null = null;

  const nameEl = view.querySelector("#name") as HTMLParagraphElement;
  nameEl.textContent = cs.opponentName;

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    startHeader = createHeader({
      userName: cs.userName,
      userScore: cs.score.me,
      opponentName: cs.opponentName,
      opponentScore: cs.score.opponent,
      salaId: cs.roomIdCorto,
    });
    slotHeader.replaceWith(startHeader.el);
  }

  const slotLogos = view.querySelector<HTMLDivElement>("#slot-logos");
  if (slotLogos) {
    const startLogos = createLogos();
    slotLogos.replaceWith(startLogos.el);
  }

  state.subscribe(() => {
    if (!startHeader) return;

    const newCs = state.getState();

    startHeader.updateScore(newCs.score.me, newCs.score.opponent);
    startHeader.updateSala(newCs.roomIdCorto);
    startHeader.updateOpponentName(newCs.opponentName);
  });

  setTimeout(() => {
    goTo("/playPage");
  }, 2000);
}

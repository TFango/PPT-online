import { lobbyLayout } from "../layouts/lobbyLayout";
import { goTo } from "../router/router";
import { createLogos } from "../components/logos";
import { createHeader } from "../components/header";
import { state } from "../store/state";

export function lobbyPage(root: HTMLElement) {
  root.innerHTML = "";
  const cs = state.getState();

  const view = lobbyLayout();
  root.appendChild(view);

  const code = view.querySelector("#code") as HTMLParagraphElement;
  code.textContent = cs.roomIdCorto;

  const slotLogos = view.querySelector<HTMLDivElement>("#slot-logos");
  if (slotLogos) {
    const startLogos = createLogos();
    slotLogos.replaceWith(startLogos.el);
  }

  let startHeader: ReturnType<typeof createHeader> | null = null;

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

  state.subscribe(() => {
    if (!startHeader) return;

    const newCs = state.getState();
    const players = Object.keys(newCs.rtdbData.game);

    startHeader.updateScore(newCs.score.me, newCs.score.opponent);
    startHeader.updateSala(newCs.roomIdCorto);
    startHeader.updateOpponentName(newCs.opponentName);
    code.textContent = newCs.roomIdCorto;

    if (players.length === 2) {
      goTo("/instructionPage");
    }
  });
}

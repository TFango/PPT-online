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

  const { owner, guest } = cs.score;
  const myScore = cs.owner ? owner : guest;
  const oppScore = cs.owner ? guest : owner;

  let unsubscribe: (() => void) | null = null;
  let redirected = false;

  let startHeader: ReturnType<typeof createHeader> | null = null;

  const nameEl = view.querySelector("#name") as HTMLParagraphElement;
  nameEl.textContent = cs.opponentName;

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    startHeader = createHeader({
      userName: cs.userName,
      userScore: myScore,
      opponentName: cs.opponentName,
      opponentScore: oppScore,
      salaId: cs.roomIdCorto,
    });
    slotHeader.replaceWith(startHeader.el);
  }

  const slotLogos = view.querySelector<HTMLDivElement>("#slot-logos");
  if (slotLogos) {
    const startLogos = createLogos();
    slotLogos.replaceWith(startLogos.el);
  }

  unsubscribe = state.subscribe(() => {
    if (!startHeader) return;
    if (redirected) return;

    const newCs = state.getState();
    const { owner, guest } = newCs.score;

    const myScore = newCs.owner ? owner : guest;
    const oppScore = newCs.owner ? guest : owner;

    const players = newCs.rtdbData.game;

    if (!players) return;

    const my = players[newCs.userId];
    const opponentId = Object.keys(players).find((id) => id !== newCs.userId);
    const opponent = opponentId ? players[opponentId] : null;

    if (!my || !opponent) return;

    console.log("🔍 waitingPage - Estado:", {
      myStart: my.start,
      opponentStart: opponent.start,
      redirected,
    });

    if (my.start && opponent.start) {
      redirected = true;
      if (unsubscribe) unsubscribe();
      goTo("/playPage");
    }

    if (startHeader) {
      startHeader.updateScore(myScore, oppScore);
      startHeader.updateSala(newCs.roomIdCorto);
      startHeader.updateOpponentName(newCs.opponentName);
    }
  });
  return () => {
    console.log("🧹 Cleanup waitingPage");
    if (unsubscribe) unsubscribe();
  };
}

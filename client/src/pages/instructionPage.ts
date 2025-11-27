import { instructionLayout } from "../layouts/instructionLayout";
import { createHeader } from "../components/header";
import { state } from "../store/state";
import { createButton } from "../components/button";
import { goTo } from "../router/router";
import { createLogos } from "../components/logos";

export function instructionPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = instructionLayout();
  root.appendChild(view);

  const cs = state.getState();
  const { owner, guest } = cs.score;

  const myScore = cs.owner ? owner : guest;
  const oppScore = cs.owner ? guest : owner;

  let unsubscribe: (() => void) | null = null;
  let redirected = false; // ← Flag para evitar múltiples redirecciones

  let startHeader: ReturnType<typeof createHeader> | null = null;
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

  const slotBtn = view.querySelector<HTMLDivElement>("#slot-btn");
  if (slotBtn) {
    const startBtn = createButton(
      {
        text: "¡Jugar!",
      },
      async () => {
        await state.sendStartSignal();
      }
    );
    slotBtn.replaceWith(startBtn.el);
  }

  const slotLogos = view.querySelector<HTMLDivElement>("#slot-logos");
  if (slotLogos) {
    const startLogos = createLogos();
    slotLogos.replaceWith(startLogos.el);
  }

  unsubscribe = state.subscribe(() => {
    if (redirected) return; // ← Evitar redirecciones múltiples

    const newCs = state.getState();

    const { owner, guest } = newCs.score;

    const myScore = newCs.owner ? owner : guest;
    const oppScore = newCs.owner ? guest : owner;

    if (startHeader) {
      startHeader.updateScore(myScore, oppScore) ;
      startHeader.updateOpponentName(newCs.opponentName);
      startHeader.updateSala(newCs.roomIdCorto);
    }

    const players = newCs.rtdbData?.game;

    if (!players) return;

    const my = players[newCs.userId];
    const opponentId = Object.keys(players).find((id) => id !== newCs.userId);
    const opponent = opponentId ? players[opponentId] : null;

    if (!my || !opponent) return;

    if (my.start && opponent.start) {
      redirected = true;
      if (unsubscribe) unsubscribe();
      goTo("/playPage");
    }

    if (my.start && !opponent.start) {
      redirected = true;
      if (unsubscribe) unsubscribe();
      goTo("/waitingPage");
    }
  });

  return () => {
    console.log("🧹 Cleanup instructionPage");
    if (unsubscribe) unsubscribe();
  };
}

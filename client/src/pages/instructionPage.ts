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

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    const startHeader = createHeader({
      userName: cs.userName,
      userScore: cs.score.me,
      opponentName: cs.opponentName,
      opponentScore: cs.score.opponent,
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
        goTo("/waitingPage");
      }
    );
    slotBtn.replaceWith(startBtn.el);
  }

  const slotLogos = view.querySelector<HTMLDivElement>("#slot-logos");
  if (slotLogos) {
    const startLogos = createLogos();
    slotLogos.replaceWith(startLogos.el);
  }

  state.subscribe(() => {
    const cs = state.getState();
    const players = cs.rtdbData.game;

    const my = players[cs.userId];
    const opponentId = Object.keys(players).find((id) => id !== cs.userId);
    const opponent = opponentId ? players[opponentId] : null;

    if (!opponent) return;

    if (my.start && !opponent.start) {
      goTo("/waitingPage");
    }

    if (my.start && opponent.start) {
      goTo("/playPage");
    }
  });
}

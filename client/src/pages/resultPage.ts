import { resultLayout } from "../layouts/resultLayout";
import { createButton } from "../components/button";
import { goTo } from "../router/router";
import { state } from "../store/state";
import { createStar } from "../components/star";

export function resultPage(root: HTMLElement) {
  root.innerHTML = "";
  const cs = state.getState();
  const winner = cs.winner;

  const view = resultLayout();
  root.appendChild(view);

  if (winner === "me") {
    view.classList.add("result--win");
  } else if (winner === "opponent") {
    view.classList.add("result--lose");
  }

  const slotStar = view.querySelector("#slot-star");
  if (slotStar) {
    const star = createStar(cs.winner === "me" ? "win" : "lose");
    slotStar.replaceWith(star.el);
  }

  const meScore = view.querySelector<HTMLParagraphElement>("#meScore");
  if (meScore) {
    meScore.textContent = `${cs.userName} : ${cs.score.me}`;
  }

  const opponentScore =
    view.querySelector<HTMLParagraphElement>("#opponentScore");

  if (opponentScore) {
    opponentScore.textContent = `${cs.opponentName} : ${cs.score.opponent}`;
  }

  const slotBtn = view.querySelector<HTMLDivElement>("#slot-btn");
  if (slotBtn) {
    const startBtn = createButton({ text: "Volver a jugar" }, () => {
      goTo("/waitingPage");
    });
    slotBtn.replaceWith(startBtn.el);
  }
}

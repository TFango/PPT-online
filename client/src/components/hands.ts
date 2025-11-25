import tijera from "../assets/tijera.svg";
import piedra from "../assets/piedra.svg";
import papel from "../assets/papel.svg";

export type Move = "piedra" | "papel" | "tijera";

export function createHands(onSelect: (m: Move) => void) {
  let selected: Move | null = null;
  const div = document.createElement("div");
  div.className = "move h-logos";

  div.innerHTML = `
    <div class="moves logos">
    <img data-move="tijera" class="h-logo move" src="${tijera}" alt="tijera" />
    <img data-move="piedra" class="h-logo move" src="${piedra}" alt="piedra" />
    <img data-move="papel" class="h-logo move" src="${papel}" alt="papel" />
    </div>
  `;

  const container = div.querySelector<HTMLDivElement>(".moves");
  container?.addEventListener("click", (e) => {
    const el = (e.target as HTMLElement).closest<HTMLImageElement>(".move");
    if (!el) return;

    const move = el.dataset.move as Move;
    selected = move;

    container.querySelectorAll(".move.is-selected").forEach((img) => {
      img.classList.remove("is-selected");
    });

    el.classList.add("is-selected");
    container.classList.add("has-selected");

    onSelect(move);
  });

  function getSelected() {
    return selected;
  }

  function reset() {
    selected = null;
    div.querySelectorAll(".h-logo").forEach((img) => {
      img.classList.remove("selected");
    });
  }

  return {
    el: div,
    getSelected,
    reset,
    destroy: () => div.remove(),
  };
}

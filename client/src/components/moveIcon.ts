import piedra from "../assets/piedra.svg";
import papel from "../assets/papel.svg";
import tijera from "../assets/tijera.svg";

export type Move = "piedra" | "papel" | "tijera";
export type Role = "me" | "opponent";

type Props = {
  move: Move;
  role?: Role; // por si querés girar la del oponente
};

export function createMoveIcon(p: Props) {
  const wrap = document.createElement("div");
  wrap.className = `move-icon ${p.role ?? "me"}`;

  const srcByMove: Record<Move, string> = {
    piedra,
    papel,
    tijera,
  };

  wrap.innerHTML = `
    <img class="move-icon__img" alt="${p.move}" src="${srcByMove[p.move]}"/>
  `;

  function setMove(m: Move) {
    const img = wrap.querySelector(".move-icon__img") as HTMLImageElement;
    img.src = srcByMove[m];
  }

  function setRole(r: Role) {
    wrap.classList.remove("me", "opponent");
    wrap.classList.add(r);
  }

  function destroy() {
    wrap.remove();
  }

  return { el: wrap, setMove, setRole, destroy };
}
import starWinUrl from "../assets/win.svg";
import starLoseUrl from "../assets/lose.svg";

export type StarType = "win" | "lose";

const starMap: Record<StarType, string> = {
  win: starWinUrl,
  lose: starLoseUrl,
};

export function createStar(type: StarType) {
  const wrapper = document.createElement("div");
  wrapper.className = "star-wrapper";

  const img = document.createElement("img");
  img.className = "star-img";
  img.src = starMap[type];
  img.alt = type === "win" ? "Ganaste" : "Pediste";

  wrapper.appendChild(img);

  function setType(newType: StarType) {
    img.src = starMap[newType];
    img.alt = newType === "win" ? "Ganaste" : "Perdiste";
  }

  function destroy() {
    wrapper.remove();
  }

  return {
    el: wrapper,
    setType,
    destroy,
  };
}

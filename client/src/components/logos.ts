import tijera from "../assets/tijera.svg";
import piedra from "../assets/piedra.svg";
import papel from "../assets/papel.svg";

export function createLogos() {
  const wrap = document.createElement("div");
  wrap.classList.add("logos");

  wrap.innerHTML = `
  <img class="logo" src="${tijera}" alt="tijera" />
  <img class="logo" src="${piedra}" alt="piedra" />
  <img class="logo" src="${papel}" alt="papel" />
  `;

  return {
    el: wrap,
    destroy: () => wrap.remove(),
  };
}

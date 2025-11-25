import "../styles/layouts/waitingLayout.css";

export function waitingLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
  <div id="slot-header"></div>


  <main class="w-main">
    <div class="w-main__container">
        <p class="w-main__description">Esperando a que <strong id="name"></strong> presione ¡Jugar!</p>
  
        <div id="slot-logos"></div>
    </div>
  </main>

  `;

  return div;
}

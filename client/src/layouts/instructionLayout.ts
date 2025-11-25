import "../styles/layouts/instructionLayout.css";

export function instructionLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
    <main class="i-main">
        <div class="i-main__container">
            <div id="slot-header"></div>

            <section class="i-main__description">
            <h1 class="i-main__title">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</br>
            ¡Si es empate, volveran a esta pantalla!</h1>

            <div id="slot-btn"></div>
            </section>
            <div id="slot-logos"></div>
        </div>
    </main>
  `;

  return div;
}

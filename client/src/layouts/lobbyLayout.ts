import "../styles/layouts/lobbyLayout.css";

export function lobbyLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
    <div id="slot-header"></div>
    
    <main class="lb-main">
        <div class="lb-main__container">
            <section class="lb-main__description">
                <p class="lb-description nocode">Comparti el codigo:</p>
                <p class="lb-description code" id="code"></p>
                <p class="lb-description nocode">Con tu contrincante</p>
            </section>

            <div id="slot-logos"></div>
        </div>
    </main>
    `;

  return div;
}

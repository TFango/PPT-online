import "../styles/layouts/lobbyLayout.css";

export function lobbyLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
    <header class="lb-header">
        <div class="lb-header__container">
        
            <section class="lb-header__score">
                <p class="lb-score__user">Emita: 0</p>
                <p class="lb-score__oponent">Candelita: 0</p>
            </section>

            <section class="lb-sala">
                <p class="lb-sala__description">Sala</p>
                <p class="lb-sala__description-name">76HH23</p>
            </section>
        </div>
    </header>
    
    <main class="lb-main">
        <div class="lb-main__container">
            <section class="lb-main__description">
                <p class="description nocode">Comparti el codigo:</p>
                <p class="description code">76HH23</p>
                <p class="description nocode">Con tu contrincante</p>
            </section>

            <div id="slot-logos"></div>
        </div>
    </main>
    `;

  return div;
}

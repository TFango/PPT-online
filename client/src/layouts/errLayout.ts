import "../styles/layouts/errLayout.css";

export function errLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
    <main class="err-main">
        <div class="err-main__container">
        <div id="slot-title"></div>
        
        <p class="err-main__description">Ups, esta sala está completa y tu nombre no coincide con nadie en la sala.</p>

        <div id="slot-logos"></div>
        </div>
    </main>


    `;

  return div;
}

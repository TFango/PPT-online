import "../styles/layouts/wachLayout.css";

export function wachIconLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
  <main class="watch-main">
    <div class="watch-main__container">
        <div id="slot-opponent"></div>

        <div id="slot-me"></div>
    </div>
  </main>
  
  `;

  return div;
}

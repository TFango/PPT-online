import "../styles/layouts/playLayout.css";


export function playLayout() {
  const div = document.createElement("div");

  div.innerHTML = `
  <main class="p-main">
    <div class="p-main__container">
        <div id="slot-count"></div>

        <div id="slot-hands"></div>
    </div>
  </main>
  `;

  return div;
}

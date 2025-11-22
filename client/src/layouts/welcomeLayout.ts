import "../styles/layouts/welcome.css";

export function welcomeLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
<main class="main">
      <div class="main__container">
        <div id="slot-title"></div>

        <section class="main__buttons">
          <div id="slotButton-newRoom"></div>
          <div id="slotButton-connectRoom"></div>
        </section>

          <div id="slot-logos"></div>
      </div>
    </main>  
  `;

  return div;
}

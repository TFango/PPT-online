import "../styles/layouts/codeLayout.css";

export function codeLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
    <main class="code-main">
        <div class="code-main__container">
             <div id="slot-title"></div>

             <form class="code-form">
                <input type="text" class="code-input" placeholder="código">
             </form>

             <section class="main__buttons">
             <div id="slot-Btn"></div>
             </section>

             <div id="slot-logos"></div>
        </div>
    </main>
    
    `;

  return div;
}

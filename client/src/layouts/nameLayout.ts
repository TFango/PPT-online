import "../styles/layouts/nameLayout.css";

export function nameLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
    <main class="name-main">
        <div class="name-main__container">
        <div id="slot-title"></div>

        <form class="name-form">
            <input type="text" class="name-input" placeholder="Tu nombre">
            </form>

            <section class="main__buttons">
            <div id="slotBtn"></div>
            </section>
            
        <div id="slot-logos"></div> 
        </div>
   </main>  
  `;

  return div;
}

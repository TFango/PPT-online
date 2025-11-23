import "../styles/layouts/namePage.css";

export function namePageLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
    <main class="main">
        <div class="main__container">
        <div id="slot-title"></div>

        <form class="form">
            <label for="" class="label">Tu nombre</label>
            <input type="text" class="input">
            <div id="slotBtn"></div>
        </form>

        <div id="slot-logos"></div> 
        </div>
   </main>  
  `;

  return div;
}

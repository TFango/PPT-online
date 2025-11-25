import "../styles/layouts/resultLayout.css";
import img from "../assets/win.svg";

export function resultLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
    <main class="r-main">
        <div class="r-main__container">
                <div id="slot-star"></div>

                <section class="r-main__score">
                    <h1 class="r-main__title">Score</h1>
                    <p class="description r-main__me" id="meScore"></p>
                    <p class="description r-main__opponent" id="opponentScore"></p>
                </section>

                <div id="slot-btn"></div>
        </div>
    </main>
  `;

  return div;
}

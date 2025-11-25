export type HeaderProps = {
  userName: string;
  userScore: number;
  opponentName: string;
  opponentScore: number;
  salaId: string;
};

export function createHeader(props: HeaderProps) {
  const header = document.createElement("header");
  header.className = "lb-header";

  header.innerHTML = `
  <div class="lb-header__container">
        
        <section class="lb-header__score">
            <p class="lb-score__user">${props.userName}: ${props.userScore}</p>
            <p class="lb-score__oponent">${props.opponentName}: ${props.opponentScore}</p>
        </section>

        <section class="lb-sala">
            <p class="lb-sala__description">Sala</p>
            <p class="lb-sala__description-name">${props.salaId}</p>
        </section>
    </div>
  `;

  function updateScore(user: number, opponent: number) {
    header.querySelector(
      ".lb-score__user"
    )!.textContent = `${props.userName}: ${user}`;

    header.querySelector(
      ".lb-score__oponent"
    )!.textContent = `${props.opponentName}: ${opponent}`;
  }

  function updateSala(id: string) {
    header.querySelector(".lb-sala__description-name")!.textContent = id;
  }

  function updateOpponentName(name: string) {
    props.opponentName = name;

    const opponentScoreEl = header.querySelector(".lb-score__oponent");
    if (opponentScoreEl) {
      // mantiene el score existente, cambia solo el nombre
      const score = opponentScoreEl.textContent?.split(": ")[1] || "0";
      opponentScoreEl.textContent = `${name}: ${score}`;
    }
  }

  return { el: header, updateSala, updateScore, updateOpponentName };
}

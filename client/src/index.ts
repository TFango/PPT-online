import { state } from "./store/state";
import { initRouter } from "./router/router";
import "./styles/components/logos.css";
import "./styles/components/button.css";
import "./styles/components/title.css";
import "./styles/components/header.css";
import "./styles/components/count.css";
import "./styles/components/hands.css";
import "./styles/components/moveIcon.css";

state.init();
initRouter();

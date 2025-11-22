import { state } from "./store/state";
import { initRouter } from "./router/router";
import "./styles/components/logos.css";
import "./styles/components/button.css";
import "./styles/components/title.css";

state.init();
initRouter();

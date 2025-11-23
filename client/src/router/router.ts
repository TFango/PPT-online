import { welcomePage } from "../pages/welcomePage";
import { namePage } from "../pages/namePage";

const routes: Record<string, (root: HTMLElement) => void> = {
  // Objeto que mapea rutas a funciones que renderizan paginas
  // Aqui iran las rutas a la page
  "/": welcomePage,
  "/namePage": namePage,
};

const root = document.getElementById("app")!; // Obtiene el elemento contenedor principal de la app
let cleanup: (() => void) | undefined; // Variable para guardar funcion de limpieza

function render() {
  // funcion principal que renderiza la pagina actual
  cleanup?.(); // Ejecuta limpieza de la pagina anterior si existe

  let route = location.hash.replace("#", ""); // Obtiene la ruta actual del hash

  if (route === "" || route === undefined) {
    // Si no hay ruta, usa la pagina principal
    route = "/";
  }

  const page = routes[route]; // Busca la funcion de la pagina correspondiente
  if (!page) {
    // Si no existe la ruta, muetra error 404
    root.textContent = "404";
    return;
  }

  const maybeCleanup = page(root); // Ejecuta la funcion de la pagina y guarda posible funcion de limpieza
  if (typeof maybeCleanup === "function") cleanup = maybeCleanup; // Si la pagina devuelve una funcion, la guarda para limpiar despues
}

export function goTo(path: string) {
  // Funcion para navegar a una ruta especifica
  location.hash = path; // Cambia el hash para triggerear hashchange
}

export function initRouter() {
  // inicializa el router
  window.addEventListener("hashchange", render);
  render();
}

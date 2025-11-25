export type ButtonProps = {
  text: string;
  id?: string;
  className?: string;
  disabled?: boolean;
};

export function createButton(props: ButtonProps, onClick?: () => void) {
  // Crea un botón reutilizable
  const btn = document.createElement("button");

  btn.classList.add("btn"); // Clase base

  // Configuracion de propiedades del boton
  if (props.id) btn.id = props.id;
  if (props.className) btn.classList.add(props.className);
  btn.textContent = props.text;
  btn.disabled = !!props.disabled; // Convierte a booleano

  // Evento click si se proporciona
  if (onClick)
    btn.addEventListener("click", () => {
      if (!btn.disabled) onClick(); // Solo ejecuta si no esta deshabilitado
    });

  // Devuelve metodos para controlar el boton
  const setText = (text: string) => (btn.textContent = text);
  const setDisabled = (value: boolean) => (btn.disabled = value);
  const destroy = () => btn.remove();

  return { el: btn, setText, setDisabled, destroy };
}

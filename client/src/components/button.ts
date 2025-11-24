export type ButtonProps = {
  text: string;
  id?: string;
  className?: string;
  disabled?: boolean;
};

export function createButton(props: ButtonProps, onClick?: () => void) {
  const btn = document.createElement("button");

  btn.classList.add("btn");

  if (props.id) btn.id = props.id;
  if (props.className) btn.classList.add(props.className);
  btn.textContent = props.text;
  btn.disabled = !!props.disabled;

  if (onClick)
    btn.addEventListener("click", () => {
      if (!btn.disabled) onClick();
    });

  const setText = (text: string) => (btn.textContent = text);
  const setDisabled = (value: boolean) => (btn.disabled = value);
  const destroy = () => btn.remove();

  return { el: btn, setText, setDisabled, destroy };
}

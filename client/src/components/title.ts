export type TitleProps = {
  text: string;
  id?: string;
};

export function createTitle(props: TitleProps) {
  const title = document.createElement("h1");

  title.classList.add("main__title");

  if (props.id) title.id = props.id;
  title.textContent = props.text;

  const setText = (text: string) => (title.textContent = text);
  const destroy = () => title.remove();

  return { el: title, setText, destroy };
}

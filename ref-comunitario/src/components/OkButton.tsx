import { type ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function OkButton(props: Props) {
  return (
    <button {...props} type={props.type ?? "submit"} className={`ok-button ${props.className ?? ""}`.trim()}>
      {props.children ?? "OK"}
    </button>
  );
}

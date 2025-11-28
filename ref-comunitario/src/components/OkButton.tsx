import { type ButtonHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  toHome?: boolean; 
};

export function OkButton({ toHome, ...props }: Props) {
  const navigate = useNavigate();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    props.onClick?.(e); 
    if (e.defaultPrevented) return;

    if (toHome) {
      navigate("/");
    }
  }

  return (
    <button
      {...props}
      onClick={handleClick}
      type={props.type ?? "submit"}
      className={`ok-button ${props.className ?? ""}`.trim()}
    >
      {props.children ?? "OK"}
    </button>
  );
}

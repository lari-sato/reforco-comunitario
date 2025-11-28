// HelpButton.tsx
import { useNavigate } from "react-router-dom";

export function HelpButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/classform");
  }

  return (
    <button
      type="button"
      className="btn-help"
      onClick={handleClick}
    >
      Solicitar Ajuda
    </button>
  );
}

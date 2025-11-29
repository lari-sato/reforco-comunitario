import { useNavigate } from "react-router-dom";

interface HelpButtonProps {
  disabled?: boolean;
}

export function HelpButton({ disabled }: HelpButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="btn-help"
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        navigate("/classform");
      }}
    >
      Solicitar ajuda
    </button>
  );
}

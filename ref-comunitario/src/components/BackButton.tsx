import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to: string;
}

export function BackButton({ to }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      className="btn-voltar"
      type="button"
      onClick={() => navigate(to)}
    >
      Voltar
    </button>
  );
}

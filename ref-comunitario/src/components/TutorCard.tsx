import user from "../assets/icons/user.svg";

interface TutorCardProps {
  nome: string;
  onClick?: () => void;
}

export function TutorCard({ nome, onClick }: TutorCardProps) {
  return (
    <figure className="tutor">
      <button
        type="button"
        className="tutor__card"
        onClick={onClick}
        aria-label={`Abrir perfil de ${nome}`}
      >
        <img src={user} alt={`Foto de ${nome}`} className="tutor__avatar" />
      </button>
      <figcaption className="tutor__name">{nome}</figcaption>
    </figure>
  );
}

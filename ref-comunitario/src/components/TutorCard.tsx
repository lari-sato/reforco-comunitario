import user from "../assets/icons/user.svg";

interface TutorCardProps {
  nome: string;
  selected?: boolean;
  onClick?: () => void;
}

export function TutorCard({ nome, selected = false, onClick }: TutorCardProps) {
  return (
    <figure className="tutor">
      <button
        type="button"
        className={`tutor__card${selected ? " is-selected" : ""}`}
        onClick={onClick}
        aria-pressed={selected}
      >
        <img src={user} alt={`Foto de ${nome}`} className="tutor__avatar" />
      </button>
      <figcaption className="tutor__name">{nome}</figcaption>
    </figure>
  );
}

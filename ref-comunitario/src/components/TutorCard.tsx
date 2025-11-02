interface TutorCardProps {
  nome: string;
}

export function TutorCard({ nome }: TutorCardProps) {
  return (
    <figure className="tutor">
      <button type="button" className="tutor__card">
        <img src="/icons/pic.png" alt={`Foto de ${nome}`} className="tutor__avatar" />
      </button>
      <figcaption className="tutor__name">{nome}</figcaption>
    </figure>
  );
}

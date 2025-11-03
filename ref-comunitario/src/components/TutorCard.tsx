import { useState } from "react";
import user from "../assets/icons/user.svg";

export function TutorCard({ nome }: { nome: string }) {
  const [selected, setSelected] = useState(false);

  function onToggle() {
    setSelected((v) => !v);
  }

  return (
    <figure className="tutor">
      <button
        type="button"
        className={`tutor__card${selected ? " is-selected" : ""}`}
        onClick={onToggle}
        aria-pressed={selected}
      >
        <img src={user} alt={`Foto de ${nome}`} className="tutor__avatar" />
      </button>
      <figcaption className="tutor__name">{nome}</figcaption>
    </figure>
  );
}

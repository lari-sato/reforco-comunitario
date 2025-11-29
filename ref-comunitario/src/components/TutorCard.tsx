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

/*interface TutorCardProps {
  nome: string;
  onClick?: () => void;
}

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(
  /\/+$/,
  ""
);

export function TutorCard({ nome, onClick }: TutorCardProps) {
  const firstName = nome
    ?.trim()
    .split(" ")[0]
    ?.normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

  const avatarSrc = firstName
    ? `${API_BASE}/api/arquivos/perfil-${firstName}.png`
    : undefined;

  return (
    <figure className="tutor">
      <button
        type="button"
        className="tutor__card"
        onClick={onClick}
        aria-label={`Abrir perfil de ${nome}`}
      >
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={`Foto de ${nome}`}
            className="tutor__avatar"
            onError={(e) => {
              // fallback para placeholder se imagem falhar
              (e.currentTarget as HTMLImageElement).style.display = "none";
              const placeholder = document.createElement("div");
              placeholder.className = "tutor__avatar tutor__avatar--placeholder";
              e.currentTarget.parentElement?.appendChild(placeholder);
            }}
          />
        ) : (
          <div className="tutor__avatar tutor__avatar--placeholder" />
        )}
      </button>

      <figcaption className="tutor__name">{nome}</figcaption>
    </figure>
  );
}*/

import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";
import type { Usuario } from "../Types";

export function Profile() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    apiGet<Usuario>("/api/usuarios/perfil")
      .then(setUsuario)
      .catch((err) => console.error("Erro ao carregar perfil:", err));
  }, []);

  if (!usuario) return <p>Carregando perfil...</p>;

  return (
    <div className="profile">
      <h1>Perfil de {usuario.nome}</h1>
      <p>Email: {usuario.email}</p>
      <p>Funções: {usuario.roles.join(", ")}</p>
    </div>
  );
}

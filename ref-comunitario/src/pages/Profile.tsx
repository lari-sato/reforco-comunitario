// src/pages/Profile.tsx
import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";
import type { Usuario } from "../types";

export function Profile() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await apiGet<Usuario>("/api/usuarios/perfil");
        if (alive) {
          setUsuario(data);
          setErr(null);
        }
      } catch (e) {
        if (alive) setErr("Erro ao carregar perfil.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <p>Carregando perfil...</p>;
  if (err) return <p>{err}</p>;
  if (!usuario) return <p>Nenhum dado de perfil.</p>;

  const roles =
    Array.isArray(usuario.roles) && usuario.roles.length
      ? usuario.roles.join(", ")
      : "—";

  const materias =
    Array.isArray(usuario.materias) && usuario.materias.length
      ? usuario.materias.join(", ")
      : "—";

  return (
    <div className="container" style={{ padding: "24px 16px" }}>
      <h1 style={{ margin: "0 0 8px", fontWeight: 400 }}>
        Perfil de {usuario.nome}
      </h1>
      <p style={{ margin: "4px 0" }}>Email: {usuario.email ?? "—"}</p>
      <p style={{ margin: "4px 0" }}>Funções: {roles}</p>
      <p style={{ margin: "4px 0" }}>Matérias: {materias}</p>
    </div>
  );
}

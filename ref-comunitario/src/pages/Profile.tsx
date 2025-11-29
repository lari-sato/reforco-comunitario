import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { apiGet, apiPost } from "../lib/api";
import type { Usuario } from "../types";

type UsuarioPerfil = Usuario & {
  bio?: string;
  escolaridade?: string;
  usuario?: string;
  tipo?: string;
};

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(
  /\/+$/,
  ""
);

export function Profile() {
  const [user, setUser] = useState<UsuarioPerfil | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState<string | null>(null);

  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setErr(null);
        setLoading(true);

        const data = await apiGet<Usuario>("/api/usuarios/perfil");
        if (!alive) return;

        const roles = Array.isArray(data.roles) ? data.roles : [];
        const tipoInferido = roles.includes("instrutor")
          ? "Instrutor"
          : roles.includes("aluno")
          ? "Aluno"
          : undefined;

        setUser({
          ...data,
          tipo: tipoInferido ?? (data as any).tipo ?? "—",
          bio: (data as any).bio ?? "",
          escolaridade: (data as any).escolaridade ?? "",
          usuario: (data as any).usuario ?? "",
        });
      } catch {
        if (alive) setErr("Erro ao carregar perfil.");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  async function handleToggleEdit() {
    if (!user) return;

    // Se estava em modo visualização, apenas entra em modo edição
    if (!isEditing) {
      setSaveErr(null);
      setIsEditing(true);
      return;
    }

    // Se já está editando, agora tentamos salvar
    const payload = {
      nome: user.nome,
      email: user.email,
      usuario: user.usuario,
      escolaridade: user.escolaridade,
      bio: user.bio,
      tipo: user.tipo,
    };

    try {
      setSaving(true);
      setSaveErr(null);

      // Ajuste o endpoint se o back usar outro caminho para update
      const updated = await apiPost<Usuario>("/api/usuarios/perfil", payload);

      setUser((prev) => ({
        ...(prev ?? {}),
        ...updated,
        bio: (updated as any).bio ?? payload.bio ?? "",
        escolaridade:
          (updated as any).escolaridade ?? payload.escolaridade ?? "",
        usuario: (updated as any).usuario ?? payload.usuario ?? "",
        tipo: (updated as any).tipo ?? payload.tipo ?? prev?.tipo ?? "—",
      }));

      setIsEditing(false);
    } catch {
      setSaveErr("Erro ao salvar perfil.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Carregando perfil...</p>;
  if (err) return <p>{err}</p>;
  if (!user) return <p>Nenhum dado de perfil.</p>;

  const firstName =
    user.nome?.trim().split(" ").filter(Boolean)[0]?.toLowerCase() ?? "";
  const avatarSrc =
    !avatarFailed && firstName
      ? `${API_BASE}/api/arquivos/perfil-aluno-${firstName}.png`
      : undefined;

  return (
    <div className="profile-page container">
      <h1 className="profile-title">Perfil</h1>

      <div className="profile-content">
        {/* COLUNA ESQUERDA: Avatar e Bio */}
        <aside className="profile-sidebar">
          <div className="avatar-placeholder">
            {avatarSrc && (
              <img
                src={avatarSrc}
                alt={`Foto de perfil de ${user.nome}`}
                className="avatar-image"
                onError={() => setAvatarFailed(true)}
              />
            )}
          </div>

          <div className="user-type">
            <strong>Tipo de usuário:</strong> {user.tipo ?? "—"}
          </div>

          <div className="bio-section">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={user.bio ?? ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className="profile-input bio-input"
            />
          </div>
        </aside>

        {/* COLUNA DIREITA: Formulário */}
        <section className="profile-form">
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={user.nome ?? ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className="profile-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="usuario">Usuário:</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={user.usuario ?? ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className="profile-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email ?? ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className="profile-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="escolaridade">Escolaridade:</label>
            <input
              type="text"
              id="escolaridade"
              name="escolaridade"
              value={user.escolaridade ?? ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className="profile-input"
            />
          </div>

          {saveErr && <p className="profile-error">{saveErr}</p>}

          <div className="form-actions">
            <button
              type="button"
              className="btn-edit-profile"
              onClick={handleToggleEdit}
              disabled={saving}
            >
              {saving
                ? "Salvando..."
                : isEditing
                ? "Salvar perfil"
                : "Editar perfil"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

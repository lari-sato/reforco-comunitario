import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

type Role = "aluno" | "instrutor";

const ALL_EDU = [
  "Ensino Fundamental Incompleto",
  "Ensino Fundamental Completo",
  "Ensino Médio Incompleto",
  "Ensino Médio Completo",
  "Superior Incompleto",
  "Superior Completo",
];

const INSTRUCTOR_EDU = [
  "Ensino Fundamental Completo",
  "Ensino Médio Completo",
  "Superior Completo",
];

const YEARS_BY_EDU: Record<string, string[]> = {
  "Ensino Fundamental Incompleto": ["6º", "7º", "8º", "9º"],
  "Ensino Fundamental Completo": [],
  "Ensino Médio Incompleto": ["1º", "2º", "3º"],
  "Ensino Médio Completo": [],
  "Superior Incompleto": [],
  "Superior Completo": [],
};

export default function Register() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [openEdu, setOpenEdu] = useState<string | null>(null);
  const [selectedEdu, setSelectedEdu] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const hasAluno = roles.includes("aluno");
  const hasInstrutor = roles.includes("instrutor");
  const bothRoles = hasAluno && hasInstrutor;
  const instructorOnly = hasInstrutor && !hasAluno;

  // Filtro de escolaridade por função
  const EDU_FILTERED = bothRoles
    ? ALL_EDU.slice(ALL_EDU.findIndex(e => e === "Ensino Fundamental Completo"))
    : instructorOnly
    ? INSTRUCTOR_EDU
    : ALL_EDU;

  function toggleRole(role: Role) {
    setRoles(prev => (prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]));
  }

  function handleEduClick(edu: string) {
    setSelectedEdu(edu);
    setOpenEdu(prev => (prev === edu ? null : edu));
    setSelectedYear(null);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    navigate("/topics");
  }

  // Garante consistência quando o filtro mudar
  useEffect(() => {
    if (selectedEdu && !EDU_FILTERED.includes(selectedEdu)) {
      setSelectedEdu(null);
      setOpenEdu(null);
      setSelectedYear(null);
    }
  }, [EDU_FILTERED, selectedEdu]);

  return (
    <div className={`auth-page register-page ${bothRoles ? "both-roles" : ""}`}>
      <div className="topbar" />

      <form className="auth-form" onSubmit={handleSubmit}>
        <h3>Registre-se já!</h3>
        <p className="auth-subcta">
          Já possui uma conta? <Link to="/login">Entrar</Link>
        </p>

        <label className="field-label">USUÁRIO</label>
        <div className="field-box">
          <input placeholder="Escolha um nome legal :)" />
        </div>

        <label className="field-label">E-MAIL</label>
        <div className="field-box">
          <input type="email" placeholder="nome@gmail.com" />
        </div>

        <label className="field-label">SENHA</label>
        <div className="field-box">
          <input type="password" placeholder="Use uma senha forte!" />
        </div>

        <label className="field-label">FUNÇÃO (SELECIONE UMA OU AMBAS)</label>
        <div className="role-list">
          {(["aluno", "instrutor"] as Role[]).map(r => (
            <div
              key={r}
              className={`role-item ${roles.includes(r) ? "active" : ""}`}
              onClick={() => toggleRole(r)}
            >
              <span className="label">{r === "aluno" ? "Aluno(a)" : "Instrutor(a)"}</span>
              <span className="circle" />
            </div>
          ))}
        </div>

        <label className="field-label">ESCOLARIDADE</label>
        <div className="edu-list">
          {EDU_FILTERED.map(edu => {
            const open = openEdu === edu;
            const years = YEARS_BY_EDU[edu] ?? [];
            return (
              <div key={edu} className={`edu-item ${open ? "open" : ""}`}>
                <div className="row" onClick={() => handleEduClick(edu)}>
                  <span className="label">{edu}</span>
                  <span className={`circle ${selectedEdu === edu ? "active" : ""}`} />
                </div>
                {open && years.length > 0 && (
                  <div className="year-row">
                    {years.map(y => (
                      <button
                        type="button"
                        key={y}
                        className={`year-btn ${selectedYear === y ? "active" : ""}`}
                        onClick={() => setSelectedYear(y)}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Certificação (Instrutor) */}
        {hasInstrutor && (
          <>
            <label className="field-label">
              CERTIFICAÇÃO <span className="inline-hint">*NECESSÁRIO PARA INSTRUIR</span>
            </label>
            <div className="cert-upload">
              <button type="button" className="upload-btn">ENVIAR</button>
              <span className="hint">(PDF, PNG ou JPG)</span>
            </div>
          </>
        )}

        <button type="submit" className="ok-button">OK</button>
      </form>
    </div>
  );
}

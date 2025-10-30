import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Field from "../components/Field";
import RoleSelector, { type Role } from "../components/RoleSelector";
import EduSelector from "../components/EduSelector";
import UploadCertification from "../components/UploadCertification";
import OkButton from "../components/OkButton";

const ESC_ALUNO = [
  "Ensino Fundamental Incompleto",
  "Ensino Fundamental Completo",
  "Ensino Médio Incompleto",
  "Ensino Médio Completo",
  "Superior Incompleto",
  "Superior Completo",
];

const ESC_INST = [
  "Ensino Fundamental Completo",
  "Ensino Médio Completo",
  "Superior Completo",
];

const ANOS_ESC: Record<string, string[]> = {
  "Ensino Fundamental Incompleto": ["6º", "7º", "8º", "9º"],
  "Ensino Fundamental Completo": [],
  "Ensino Médio Incompleto": ["1º", "2º", "3º"],
  "Ensino Médio Completo": [],
  "Superior Incompleto": [],
  "Superior Completo": [],
};

// Bolha de erro minimalista
function ErrorBubble({ children }: { children: string }) {
  return <span className="error-bubble">{children}</span>;
}

export default function Register() {
  const navigate = useNavigate();

  // Campos básicos
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // Seleções
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedEdu, setSelectedEdu] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  // Upload (instrutor)
  const [certFile, setCertFile] = useState<File | null>(null);

  // Exibição de erros
  const [triedSubmit, setTriedSubmit] = useState(false);

  const hasAluno = roles.includes("aluno");
  const hasInstrutor = roles.includes("instrutor");
  const bothRoles = hasAluno && hasInstrutor;
  const instructorOnly = hasInstrutor && !hasAluno;

  const ESC_FILTRO = bothRoles
    ? ESC_ALUNO.slice(ESC_ALUNO.findIndex(e => e === "Ensino Fundamental Completo"))
    : instructorOnly
    ? ESC_INST
    : ESC_ALUNO;

  useEffect(() => {
    if (selectedEdu && !ESC_FILTRO.includes(selectedEdu)) {
      setSelectedEdu(null);
      setSelectedYear(null);
    }
  }, [ESC_FILTRO, selectedEdu]);

  // Validações
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasRole = roles.length > 0;
  const eduOk = !!selectedEdu;
  const yearsForEdu = selectedEdu ? (ANOS_ESC[selectedEdu] ?? []) : [];
  const needsYear = yearsForEdu.length > 0;
  const yearOk = needsYear ? !!selectedYear : true;
  const needsCert = hasInstrutor;
  const certOk = needsCert ? certFile !== null : true;

  const allOk =
    user.trim().length > 0 &&
    emailOk &&
    pass.trim().length > 0 &&
    hasRole &&
    eduOk &&
    yearOk &&
    certOk;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTriedSubmit(true);
    if (!allOk) return;
    navigate("/topics");
  }

  return (
    <AuthLayout
      variant="register"
      title="Registre-se já!"
      ctaText="Já possui uma conta?"
      ctaLinkText="Entrar"
      ctaHref="/login"
      onSubmit={handleSubmit}
    >
      <Field label="USUÁRIO" htmlFor="reg-user">
        <input
          id="reg-user"
          placeholder="Escolha um nome legal :)"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          aria-invalid={triedSubmit && user.trim() === "" ? "true" : "false"}
        />
        {triedSubmit && user.trim() === "" && (
          <ErrorBubble>Preencha este campo.</ErrorBubble>
        )}
      </Field>

      <Field label="E-MAIL" htmlFor="reg-email">
        <input
          id="reg-email"
          type="email"
          placeholder="nome@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={triedSubmit && !emailOk ? "true" : "false"}
        />
        {triedSubmit && !emailOk && (
          <ErrorBubble>Preencha este campo.</ErrorBubble>
        )}
      </Field>

      <Field label="SENHA" htmlFor="reg-pass">
        <input
          id="reg-pass"
          type="password"
          placeholder="Use uma senha forte!"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          aria-invalid={triedSubmit && pass.trim() === "" ? "true" : "false"}
        />
        {triedSubmit && pass.trim() === "" && (
          <ErrorBubble>Preencha este campo.</ErrorBubble>
        )}
      </Field>

      <label className="field-label">FUNÇÃO (SELECIONE UMA OU AMBAS)</label>
      <RoleSelector selected={roles} onChange={setRoles} />
      {triedSubmit && !hasRole && (
        <ErrorBubble>Preencha este campo.</ErrorBubble>
      )}

      <label className="field-label">ESCOLARIDADE</label>
      <EduSelector
        options={ESC_FILTRO}
        yearsMap={ANOS_ESC}
        selectedEdu={selectedEdu}
        selectedYear={selectedYear}
        onEduChange={setSelectedEdu}
        onYearChange={setSelectedYear}
      />
      {triedSubmit && !eduOk && (
        <ErrorBubble>Preencha este campo.</ErrorBubble>
      )}
      {triedSubmit && eduOk && needsYear && !yearOk && (
        <ErrorBubble>Preencha este campo.</ErrorBubble>
      )}

      {hasInstrutor && (
        <>
          <UploadCertification onFile={(f) => setCertFile(f)} />
          {triedSubmit && needsCert && !certOk && (
            <ErrorBubble>Preencha este campo.</ErrorBubble>
          )}
        </>
      )}

      <OkButton disabled={!allOk} aria-disabled={!allOk}>
        OK
      </OkButton>
    </AuthLayout>
  );
}

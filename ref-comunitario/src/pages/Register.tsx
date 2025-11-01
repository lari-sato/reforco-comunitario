import { useState, useEffect, useMemo, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Field from "../components/Field";
import RoleSelector, { type Role } from "../components/RoleSelector";
import EduSelector from "../components/EduSelector";
import { UploadCertification } from "../components/UploadCertification";
import OkButton from "../components/OkButton";
import { apiPost, apiPostForm } from "../lib/api";

const ESC_ALUNO = [
  "Ensino Fundamental Incompleto",
  "Ensino Fundamental Completo",
  "Ensino Médio Incompleto",
  "Ensino Médio Completo",
  "Superior Incompleto",
  "Superior Completo",
] as const;

const ESC_INST = [
  "Ensino Fundamental Completo",
  "Ensino Médio Completo",
  "Superior Completo",
] as const;

const ANOS_ESC: Record<string, string[]> = {
  "Ensino Fundamental Incompleto": ["6º", "7º", "8º", "9º"],
  "Ensino Fundamental Completo": [],
  "Ensino Médio Incompleto": ["1º", "2º", "3º"],
  "Ensino Médio Completo": [],
  "Superior Incompleto": [],
  "Superior Completo": [],
};

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedEdu, setSelectedEdu] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const [certFile, setCertFile] = useState<File | null>(null);

  const hasAluno = roles.includes("aluno");
  const hasInstrutor = roles.includes("instrutor");
  const bothRoles = hasAluno && hasInstrutor;
  const instructorOnly = hasInstrutor && !hasAluno;

  const ESC_FILTRO = useMemo(() => {
    if (bothRoles) {
      const i = ESC_ALUNO.findIndex((e) => e === "Ensino Fundamental Completo");
      return ESC_ALUNO.slice(i);
    }
    if (instructorOnly) return [...ESC_INST];
    return [...ESC_ALUNO];
  }, [bothRoles, instructorOnly]);

  useEffect(() => {
    if (selectedEdu && !ESC_FILTRO.includes(selectedEdu as any)) {
      setSelectedEdu(null);
      setSelectedYear(null);
    }
  }, [ESC_FILTRO, selectedEdu]);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasRole = roles.length > 0;
  const yearsForEdu = selectedEdu ? ANOS_ESC[selectedEdu] ?? [] : [];
  const needsYear = yearsForEdu.length > 0;
  const yearOk = needsYear ? !!selectedYear : true;
  const needsCert = hasInstrutor;
  const certOk = needsCert ? certFile !== null : true;

  const allOk =
    user.trim() && emailOk && pass.trim() && hasRole && !!selectedEdu && yearOk && certOk;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!allOk) return;

    try {
      if (certFile) {
        const form = new FormData();
        form.append("usuario", user);
        form.append("email", email);
        form.append("senha", pass);
        form.append("roles", JSON.stringify(roles));
        form.append("escolaridade", selectedEdu || "");
        form.append("ano", selectedYear || "");
        form.append("certificacao", certFile, certFile.name);
        await apiPostForm("/api/registro/cadastro", form);
      } else {
        await apiPost("/api/registro/cadastro", {
          usuario: user,
          email,
          senha: pass,
          roles,
          escolaridade: selectedEdu,
          ano: selectedYear,
        });
      }
      navigate("/topics");
    } catch (err) {
      console.error(err);
      alert("Erro ao registrar usuário.");
    }
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
          required
        />
      </Field>

      <Field label="E-MAIL" htmlFor="reg-email">
        <input
          id="reg-email"
          type="email"
          placeholder="nome@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Field>

      <Field label="SENHA" htmlFor="reg-pass">
        <input
          id="reg-pass"
          type="password"
          placeholder="Use uma senha forte!"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
      </Field>

      <label className="field-label">FUNÇÃO (SELECIONE UMA OU AMBAS)</label>
      <RoleSelector selected={roles} onChange={setRoles} />

      <label className="field-label">ESCOLARIDADE</label>
      <EduSelector
        options={ESC_FILTRO as string[]}
        yearsMap={ANOS_ESC}
        selectedEdu={selectedEdu}
        selectedYear={selectedYear}
        onEduChange={setSelectedEdu}
        onYearChange={setSelectedYear}
      />

      {hasInstrutor && <UploadCertification onFile={setCertFile} />}

      <OkButton disabled={!allOk} aria-disabled={!allOk}>OK</OkButton>
    </AuthLayout>
  );
}

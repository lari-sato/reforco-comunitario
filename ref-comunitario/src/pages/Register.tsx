import { useState, useEffect, useMemo, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { Field } from "../components/Field";
import { RoleSelector, type Role } from "../components/RoleSelector";
import { EduSelector } from "../components/EduSelector";
import { UploadCertification } from "../components/UploadCertification";
import { OkButton } from "../components/OkButton";
import { apiPost, apiPostForm } from "../lib/api";

// Rótulos exibidos na UI
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

// Mapa de anos por escolaridade (para o seletor de série/ano)
const ANOS_ESC: Record<string, string[]> = {
  "Ensino Fundamental Incompleto": ["6º", "7º", "8º", "9º"],
  "Ensino Fundamental Completo": [],
  "Ensino Médio Incompleto": ["1º", "2º", "3º"],
  "Ensino Médio Completo": [],
  "Superior Incompleto": [],
  "Superior Completo": [],
};

// Mapeia as roles da UI para o enum TipoEnum do back-end
function mapRolesToTipo(roles: Role[]): "Aluno" | "Instrutor" | "Ambos" {
  const hasAluno = roles.includes("aluno");
  const hasInstrutor = roles.includes("instrutor");

  if (hasAluno && hasInstrutor) return "Ambos";
  if (hasAluno) return "Aluno";
  if (hasInstrutor) return "Instrutor";

  // Não deveria acontecer porque o botão é desabilitado sem role
  throw new Error("Nenhuma função selecionada");
}

// Mapeia o texto exibido para o enum EscolaridadeEnum do back-end
function mapEscolaridadeToEnum(value: string | null): string | null {
  switch (value) {
    case "Ensino Fundamental Incompleto":
      return "FundInc";
    case "Ensino Fundamental Completo":
      return "FundComp";
    case "Ensino Médio Incompleto":
      return "MedioInc";
    case "Ensino Médio Completo":
      return "MedioComp";
    case "Superior Incompleto":
      return "SupInc";
    case "Superior Completo":
      return "SupComp";
    default:
      return null;
  }
}

export function Register() {
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

  // Opções de escolaridade variam conforme o papel selecionado
  const ESC_FILTRO = useMemo(() => {
    if (hasAluno && hasInstrutor) {
      return Array.from(new Set([...ESC_ALUNO, ...ESC_INST]));
    }
    if (hasInstrutor) return [...ESC_INST];
    return [...ESC_ALUNO];
  }, [hasAluno, hasInstrutor]);

  // Se o usuário trocar os papéis e a escolaridade atual deixar de ser válida, limpamos
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
    user.trim().length > 0 &&
    emailOk &&
    pass.trim().length > 0 &&
    hasRole &&
    !!selectedEdu &&
    yearOk &&
    certOk;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!allOk) return;

    try {
      const tipo = mapRolesToTipo(roles);
      const escolaridadeEnum = mapEscolaridadeToEnum(selectedEdu);

      if (!escolaridadeEnum) {
        throw new Error("Escolaridade inválida");
      }

      // Corpo base esperado pelo back-end (UsuarioDTO)
      const basePayload = {
        nome: user,
        email,
        senha: pass,
        tipo,
        escolaridade: escolaridadeEnum,
        ano: selectedYear, // campo extra só utilizado pelo front; o back pode ignorar
      };

      if (certFile) {
        const form = new FormData();
        Object.entries(basePayload).forEach(([key, value]) => {
          if (value != null) {
            form.append(key, String(value));
          }
        });
        form.append("certFile", certFile, certFile.name);
        await apiPostForm("/api/registro/cadastro", form);
      } else {
        await apiPost("/api/registro/cadastro", basePayload);
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
      title="Crie sua conta"
      ctaText="Já tem uma conta?"
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
          placeholder="email@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Field>

      <Field label="SENHA" htmlFor="reg-pass">
        <input
          id="reg-pass"
          type="password"
          placeholder="Digite sua senha..."
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

      <OkButton disabled={!allOk} aria-disabled={!allOk}>
        OK
      </OkButton>
    </AuthLayout>
  );
}

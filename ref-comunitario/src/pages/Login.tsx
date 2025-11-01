import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Field from "../components/Field";
import OkButton from "../components/OkButton";
import { apiPost } from "../lib/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const disabled = !email.trim() || !senha.trim();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (disabled) return;
    await apiPost("/api/registro/login", { email, senha });
    navigate("/topics");
  }

  return (
    <AuthLayout
      variant="login"
      title="Entre agora!"
      ctaText="Não possui conta?"
      ctaLinkText="Registre-se"
      ctaHref="/register"
      onSubmit={handleSubmit}
    >
      <Field label="E-MAIL" htmlFor="login-email">
        <input
          id="login-email"
          type="email"
          placeholder="voce@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Field>

      <Field label="SENHA" htmlFor="login-pass">
        <input
          id="login-pass"
          type="password"
          placeholder="Digite sua senha..."
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </Field>

      <OkButton disabled={disabled} aria-disabled={disabled}>OK</OkButton>
    </AuthLayout>
  );
}

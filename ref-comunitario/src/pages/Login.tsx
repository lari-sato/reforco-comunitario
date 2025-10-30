import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Field from "../components/Field";
import OkButton from "../components/okButton";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !senha.trim()) return;
    navigate("/topics");
  }

  const isDisabled = !email.trim() || !senha.trim();

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

      <OkButton disabled={isDisabled}>OK</OkButton>
    </AuthLayout>
  );
}

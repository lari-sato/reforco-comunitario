import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Field from "../components/Field";
import OkButton from "../components/OkButton";
import { apiGet } from "../lib/api";
import type { Usuario } from "../Types";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const isDisabled = !email.trim() || !senha.trim();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isDisabled) return;

    try {
      // GET /api/registro/login?email=...&senha=...
      const usuario = await apiGet<Usuario>("/api/registro/login", {
        email,
        senha,
      });
      console.log("Usuário logado:", usuario);
      navigate("/topics");
    } catch (err) {
      console.error("Falha no login:", err);
      alert("Usuário ou senha inválidos.");
    }
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

      <OkButton disabled={isDisabled} aria-disabled={isDisabled}>
        OK
      </OkButton>
    </AuthLayout>
  );
}

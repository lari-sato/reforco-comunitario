import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { Field } from "../components/Field";
import { OkButton } from "../components/OkButton";
import { apiPost } from "../lib/api";

type AuthResponse = {
  autenticado: boolean;
  id: number;
  nome: string;
};

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const disabled = !email.trim() || !senha.trim();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (disabled) return;

    try {
      const resp = await apiPost<AuthResponse>("/api/registro/login", { email, senha });

      if (!resp.autenticado) {
        alert("Usuário ou senha inválidos.");
        return;
      }

      // Aqui poderíamos guardar o usuário em algum estado global / storage.
      // Por enquanto, apenas seguimos para a tela de tópicos.
      navigate("/topics");
    } catch (err) {
      console.error(err);
      alert("Erro ao realizar login.");
    }
  }

  return (
    <AuthLayout
      variant="login"
      title="Bem-vindo(a) de volta"
      ctaText="Ainda não tem conta?"
      ctaLinkText="Cadastrar"
      ctaHref="/register"
      onSubmit={handleSubmit}
    >
      <Field label="E-MAIL" htmlFor="login-email">
        <input
          id="login-email"
          type="email"
          placeholder="email@exemplo.com"
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

      <OkButton disabled={disabled} aria-disabled={disabled}>
        OK
      </OkButton>
    </AuthLayout>
  );
}

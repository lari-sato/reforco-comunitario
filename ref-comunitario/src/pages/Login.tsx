import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className="auth container">
      <h2>Entrar</h2>
      <p>Esta é a página de login (mock). Adicione o formulário aqui.</p>
      <p>
        Ainda não tem conta? <Link to="/register">Cadastrar</Link>
      </p>
    </div>
  );
}

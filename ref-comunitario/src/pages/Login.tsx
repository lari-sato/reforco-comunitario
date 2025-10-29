import { type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    navigate("/topics"); 
    // lógica de autenticação 
  }

  return (
    <div className="auth-page login-page">
      <div className="topbar" />

      <form className="auth-form" onSubmit={handleSubmit}>
        <h3>Entre agora!</h3>
        <p className="auth-subcta">
          Não possui conta? <Link to="/register">Registre-se</Link>
        </p>

        <label className="field-label">E-mail</label>
        <div className="field-box">
          <input type="email" placeholder="voce@exemplo.com" required />
        </div>

        <label className="field-label">Senha</label>
        <div className="field-box">
          <input type="password" placeholder="Digite sua senha" required />
        </div>

        <button type="submit" className="ok-button">OK</button>
      </form>
    </div>
  );
}

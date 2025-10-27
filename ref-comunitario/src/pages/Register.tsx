import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <div className="auth container">
      <h2>Cadastrar</h2>
      <p>Esta é a página de cadastro (mock). Adicione o formulário aqui.</p>
      <p>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  );
}
import { useState } from "react";
import logo from "../assets/logo/logo.png";
import { Topbar } from "../components/Topbar";

export function Home() {
  const [mostrarTexto, setMostrarTexto] = useState(false);

  return (
    <div className="home">
      <Topbar />

      <section className="home__intro container">
        <img className="home__logo" src={logo} alt="Logo Reforço Comunitário" />
        <h1 className="home__title">Reforço Comunitário</h1>

        <p className="home__lead destaque">
          O Reforço Comunitário é um espaço gratuito e colaborativo que conecta quem precisa de apoio nos estudos, com voluntários dispostos a compartilhar conhecimento.
        </p>

        {/* Botão que revela o texto */}
        <button
          className="btn-proposta"
          onClick={() => setMostrarTexto(!mostrarTexto)}
        >
          {mostrarTexto ? "Ocultar" : "Nossa Proposta"}
        </button>

        {mostrarTexto && (
          <div className="home__texto-expandido">
            <p>Alunos podem buscar ajuda por disciplina, pedir por videoaulas de instrutores verificados ou até mesmo marcar uma aula online com eles.</p>
            <p>Instrutores podem oferecer aulas gratuitas e ajudar a comunidade.</p>
            <p>Tá na escola ainda? Quer ajudar alguém com o que você sabe? Pode ser aluno e instrutor!</p>
          </div>
        )}

        <p className="home__hint">
          Vem aprender e ensinar com a gente!
        </p>
    
        <div className="home__actions">
          <a className="btn-ec" href="/login">Entrar</a>
          <div className="home__divider">OU</div>
          <a className="btn-ec" href="/register">Cadastrar</a>
        </div>

      </section>
    </div>
  );
}

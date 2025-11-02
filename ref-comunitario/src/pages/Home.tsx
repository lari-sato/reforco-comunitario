import logo from "../assets/logo/logo.png";
import { Topbar } from "../components/Topbar";

export function Home() {
  return (
    <div className="home">
      <Topbar />

      <section className="home__intro container">
        <img className="home__logo" src={logo} alt="Logo Reforço Comunitário" />
        <h1 className="home__title">Reforço Comunitário</h1>

      <section className="home__introText">
      <h1>
        O Reforço Comunitário é um espaço gratuito e colaborativo que conecta quem
        precisa de apoio nos estudos e voluntários dispostos a compartilhar
        conhecimento.
      </h1>

      <h2>
        Alunos podem buscar ajuda por disciplina, pedir por videoaulas de
        instrutores verificados ou até mesmo marcar uma aula ao vivo!
      </h2>

      <h2>
        Instrutores podem oferecer aulas gratuitas e ajudar a comunidade.
      </h2>

      <h2>
        Tá na escola ainda? Quer ajudar alguém com o que você sabe? Pode ser os
        dois!
      </h2>

      <p>Vem aprender e ensinar com a gente!</p>
    </section>



        <div className="home__actions">
          <a className="btn" href="/login">Entrar</a>
          <div className="home__divider">OU</div>
          <a className="btn" href="/register">Cadastrar</a>
        </div>
      </section>
    </div>
  );
}

import logo from '../assets/logo/logo.png';

export function Home() {
  return (
   <div className="home">

  <section className="home__intro container">
    <img className="home__logo" src={logo} alt="Logo Reforço Comunitário" />
    <h1 className="home__title">Reforço Comunitário</h1>

    <p className="home__lead">
      O Reforço Comunitário é um espaço gratuito e colaborativo que conecta quem precisa de apoio nos estudos com voluntários dispostos a compartilhar conhecimento.
Aqui você pode se cadastrar como aluno, instrutor ou ambos, buscar ajuda por disciplina ou tópico específico, pedir ou receber vídeos educativos e agendar aulas online para aprofundar seus estudos.

    </p>

    <div className="home__actions">
      <a className="btn" href="/login">Entrar</a>
      <div className="home__divider">OU</div>
      <a className="btn" href="/register">Cadastrar</a>
    </div>
  </section>
</div>
  );
}


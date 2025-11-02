export const Inbox = () => {
  const mensagens = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    titulo: `SOLICITAÇÃO #${i + 1}`,
    hora: "10h00",
    tipo: i % 2 === 0 ? "chamada" : "play",
  }));

  return (
    <>
      <div className="inbox-content">
        <h1 className="titulo">Solicitações</h1>

        <div className="lista">
          {mensagens.map((m, index) => (
            <div key={m.id} className={`linha ${index % 2 === 0 ? "cinza" : ""}`}>
              <div className="icone">
                {m.tipo === "chamada" ? (
                  <span className="material-icons">call</span>
                ) : (
                  <span className="material-icons">play_circle</span>
                )}
              </div>
              <span className="texto">{m.titulo}</span>
              <span className="hora">{m.hora}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
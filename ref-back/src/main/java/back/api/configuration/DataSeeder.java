package back.api.configuration;

import back.api.model.entity.*;
import back.api.repository.*;
import back.api.enums.EscolaridadeEnum;
import back.api.enums.StatusEnum;
import back.api.enums.TipoEnum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.logging.Logger;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger LOGGER = Logger.getLogger(DataSeeder.class.getName());

    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private TopicoRepository topicoRepository;
    @Autowired private AgendamentoRepository agendamentoRepository;
    @Autowired private AulaRepository aulaRepository;
    @Autowired private SolicitacaoRepository solicitacaoRepository;
    @Autowired private AvaliacaoRepository avaliacaoRepository;
    @Autowired private DenunciaRepository denunciaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Configuração do armazenamento
    @Value("${API_BASE_URL}")
    private String apiBaseUrl;

    // Variáveis para reuso
    private Topico tMat, tPort, tIng, tFis, tQuim, tBio, tHist, tGeo, tRed, tProg, tArtes, tFin;
    private Usuario alunaAna, alunoPedro, alunaJulia, alunoLucas;
    private Usuario instrutorJoao, instrutorAna, instrutorMarcos;
    private String baseUrl;

    @Override
    public void run(String... args) throws Exception {
        if (usuarioRepository.count() > 0) {
            LOGGER.info("O banco de dados já contém dados. 'Seed' não executado.");
            return;
        }

        LOGGER.info("Iniciando 'seed' completo...");
        // Define a URL base para as imagens (ex: http://localhost:8080/api/arquivos/)
        this.baseUrl = apiBaseUrl + "/api/arquivos/";

        seedTopicos();
        seedUsuarios();
        seedInteracoes();

        LOGGER.info("'Seed' concluído com sucesso.");
    }

    private void seedTopicos() {
        LOGGER.info("Seed: Criando Tópicos...");
        tMat  = criarTopico("Matemática", "topico-matematica.jpg");
        tPort = criarTopico("Português", "topico-portugues.jpg");
        tIng  = criarTopico("Inglês", "topico-ingles.jpg");
        tFis  = criarTopico("Física", "topico-fisica.jpg");
        tQuim = criarTopico("Química", "topico-quimica.jpg");
        tBio  = criarTopico("Biologia", "topico-biologia.jpg");
        tHist = criarTopico("História", "topico-historia.jpg");
        tGeo  = criarTopico("Geografia", "topico-geografia.jpg");
        tRed  = criarTopico("Redação", "topico-redacao.jpg");
        tProg = criarTopico("Programação", "topico-programacao.jpg");
        tArtes = criarTopico("Artes", "topico-artes.jpg");
        tFin  = criarTopico("Educação Financeira", "topico-educacao-financeira.jpg");
    }

    private void seedUsuarios() {
        LOGGER.info("Seed: Criando Tutores e Alunos...");

        instrutorAna = criarInstrutor("Ana Souza", Set.of(tMat, tFis));
        
        criarInstrutor("Bruno Oliveira", Set.of(tMat, tQuim));
        criarInstrutor("Daniel Ribeiro", Set.of(tMat, tFis, tQuim));
        
        instrutorJoao = criarInstrutor("João Pereira", Set.of(tMat, tProg));
        instrutorMarcos = criarInstrutor("Marcos Carvalho", Set.of(tMat, tFin));
        
        criarInstrutor("Isabela Martins", Set.of(tPort, tRed));
        criarInstrutor("Camila Fernandes", Set.of(tIng, tRed));
        criarInstrutor("Eduarda Santos", Set.of(tQuim, tBio));
        criarInstrutor("Felipe Costa", Set.of(tBio));
        criarInstrutor("Gabriela Lima", Set.of(tHist, tGeo));
        criarInstrutor("Henrique Almeida", Set.of(tGeo));
        criarInstrutor("Larissa Azevedo", Set.of(tArtes));

        alunaAna = new Usuario();
        alunaAna.setNome("Ana Silva");
        alunaAna.setEmail("ana.aluna@email.com");
        alunaAna.setSenha(passwordEncoder.encode("senha123"));
        alunaAna.setTipo(TipoEnum.Aluno);
        alunaAna.setEscolaridade(EscolaridadeEnum.MedioInc);
        alunaAna.setFotoPerfilUrl(baseUrl + "perfil-aluno-ana.jpg"); 
        alunaAna = usuarioRepository.save(alunaAna);

        alunoPedro = new Usuario();
        alunoPedro.setNome("Pedro Souza");
        alunoPedro.setEmail("pedro.aluno@email.com");
        alunoPedro.setSenha(passwordEncoder.encode("senha123"));
        alunoPedro.setTipo(TipoEnum.Aluno);
        alunoPedro.setEscolaridade(EscolaridadeEnum.FundInc);
        alunoPedro.setFotoPerfilUrl(baseUrl + "perfil-aluno-pedro.jpg"); 
        alunoPedro = usuarioRepository.save(alunoPedro);

        alunaJulia = new Usuario();
        alunaJulia.setNome("Julia Alencar");
        alunaJulia.setEmail("julia.aluna@email.com");
        alunaJulia.setSenha(passwordEncoder.encode("senha123"));
        alunaJulia.setTipo(TipoEnum.Aluno);
        alunaJulia.setEscolaridade(EscolaridadeEnum.MedioComp);
        alunaJulia.setFotoPerfilUrl(baseUrl + "perfil-aluno-julio.jpg"); 
        alunaJulia = usuarioRepository.save(alunaJulia);

        alunoLucas = new Usuario();
        alunoLucas.setNome("Lucas Gabinatti");
        alunoLucas.setEmail("lucas.aluno@email.com");
        alunoLucas.setSenha(passwordEncoder.encode("senha123"));
        alunoLucas.setTipo(TipoEnum.Aluno);
        alunoLucas.setEscolaridade(EscolaridadeEnum.SupInc);
        alunoLucas.setFotoPerfilUrl(baseUrl + "perfil-aluno-lucas.jpg"); 
        alunoLucas = usuarioRepository.save(alunoLucas);
    }

    private void seedInteracoes() {
        LOGGER.info("Seed: Gerando solicitações distribuídas entre os alunos...");

        List<Usuario> alunos = List.of(alunaAna, alunoPedro, alunaJulia, alunoLucas);

        // Gera 15 solicitações mistas (Agendamento e Vídeo)
        for (int i = 1; i <= 15; i++) {
            LocalDateTime dataBase = LocalDateTime.now().plusDays(i).withHour(8 + (i % 10)).withMinute(0);
            
            // Escolhe um aluno da lista de forma cíclica
            Usuario alunoDaVez = alunos.get(i % alunos.size());

            if (i % 2 == 0) {
                // PAR = Chamada (Agendamento)
                Agendamento ag = new Agendamento();
                ag.setAluno(alunoDaVez);
                // Alterna instrutores (Marcos ou Ana)
                ag.setInstrutor(i % 4 == 0 ? instrutorMarcos : instrutorAna); 
                ag.setData_hora(dataBase);
                ag.setStatus(StatusEnum.Solicitado);
                agendamentoRepository.save(ag);

            } else {
                // ÍMPAR = Videoaula
                SolicitacaoVideoaula sol = new SolicitacaoVideoaula();
                sol.setAluno(alunoDaVez);
                sol.setInstrutor(instrutorJoao);
                sol.setTopico(tProg);
                sol.setDescricao("Olá, sou " + alunoDaVez.getNome() + ". Preciso de ajuda no exercício #" + i);
                sol.setStatus(StatusEnum.Solicitado);
                sol.setDataSolicitacao(dataBase.minusDays(1));
                solicitacaoRepository.save(sol);
            }
        }

        LOGGER.info("Seed: Criando histórico de aula para Julia e João...");
        
        Agendamento passado = new Agendamento();
        passado.setAluno(alunaJulia);
        passado.setInstrutor(instrutorJoao);
        passado.setData_hora(LocalDateTime.now().minusDays(5));
        passado.setStatus(StatusEnum.Aceito);
        Agendamento salvo = agendamentoRepository.save(passado);

        Aula aula = new Aula();
        aula.setAgendamento(salvo);
        aula.setLink("https://chamada/seed-julia");
        aulaRepository.save(aula);

        Avaliacao aval = new Avaliacao();
        aval.setAluno(alunaJulia);
        aval.setInstrutor(instrutorJoao);
        aval.setNota(5);
        aval.setComentario("O professor João salvou meu semestre!");
        aval.setData(LocalDateTime.now().minusDays(4));
        avaliacaoRepository.save(aval);

        instrutorJoao.setAvaliacao(new BigDecimal("5.0"));
        usuarioRepository.save(instrutorJoao);
    }

    // Métodos auxiliares:

    private Topico criarTopico(String nome, String imgName) {
        Topico t = new Topico();
        t.setNome(nome);
        t.setImageUrl(baseUrl + imgName);
        return topicoRepository.save(t);
    }

    private Usuario criarInstrutor(String nome, Set<Topico> topicos) {
        Usuario u = new Usuario();
        u.setNome(nome);
        u.setEmail(nome.toLowerCase().replace(" ", ".") + "@email.com");
        u.setSenha(passwordEncoder.encode("senha123"));
        u.setTipo(TipoEnum.Instrutor);
        u.setEscolaridade(EscolaridadeEnum.SupComp);
        
        // Começam sem avaliação
        u.setAvaliacao(null); 
        
        String primeiroNome = nome.split(" ")[0].toLowerCase();
        u.setFotoPerfilUrl(baseUrl + "perfil-" + primeiroNome + ".jpg");
        u.setCertificado(baseUrl + "cert-" + primeiroNome + ".pdf");
        
        u.setTopicosEspecialidade(topicos);
        return usuarioRepository.save(u);
    }
}
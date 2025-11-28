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

    // Configurações injetadas (mesmas do Service)
    @Value("${API_BASE_URL}")
    private String apiBaseUrl;

    private Topico tMat, tPort, tIng, tFis, tQuim, tBio, tHist, tGeo, tRed, tProg, tArtes, tFin;
    private Usuario alunaAna;
    private Usuario instrutorJoao;
    private String baseUrl;

    @Override
    public void run(String... args) throws Exception {
        if (usuarioRepository.count() > 0) {
            LOGGER.info("O banco de dados já contém dados. 'Seed' não executado.");
            return;
        }

        LOGGER.info("Iniciando 'seed' realista (Instrutores sem nota inicial)...");
        this.baseUrl = apiBaseUrl + "/api/arquivos/";

        seedTopicos();
        seedUsuarios();
        seedInteracoes();

        LOGGER.info("'Seed' concluído.");
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

        criarInstrutor("Ana Souza", Set.of(tMat, tFis));
        criarInstrutor("Bruno Oliveira", Set.of(tMat, tQuim));
        criarInstrutor("Daniel Ribeiro", Set.of(tMat, tFis, tQuim));
        
        // João Pereira (Será avaliado no seedInteracoes)
        instrutorJoao = criarInstrutor("João Pereira", Set.of(tMat, tProg));

        criarInstrutor("Marcos Carvalho", Set.of(tMat, tFin));
        criarInstrutor("Isabela Martins", Set.of(tPort, tRed));
        criarInstrutor("Camila Fernandes", Set.of(tIng, tRed));
        criarInstrutor("Eduarda Santos", Set.of(tQuim, tBio));
        criarInstrutor("Felipe Costa", Set.of(tBio));
        criarInstrutor("Gabriela Lima", Set.of(tHist, tGeo));
        criarInstrutor("Henrique Almeida", Set.of(tGeo));
        criarInstrutor("Larissa Azevedo", Set.of(tArtes));

        alunaAna = new Usuario();
        alunaAna.setNome("Aluna Teste");
        alunaAna.setEmail("aluna@email.com");
        alunaAna.setSenha(passwordEncoder.encode("senha123"));
        alunaAna.setTipo(TipoEnum.Aluno);
        alunaAna.setEscolaridade(EscolaridadeEnum.MedioInc);
        alunaAna = usuarioRepository.save(alunaAna);
    }

    private void seedInteracoes() {
        LOGGER.info("Seed: Criando Agendamentos e Avaliações...");

        // 1. Agendamento Aceito e Realizado
        Agendamento aceito = new Agendamento();
        aceito.setAluno(alunaAna);
        aceito.setInstrutor(instrutorJoao);
        aceito.setData_hora(LocalDateTime.now().minusDays(1)); // Ontem
        aceito.setStatus(StatusEnum.Aceito);
        Agendamento agendamentoSalvo = agendamentoRepository.save(aceito);

        Aula aula = new Aula();
        aula.setAgendamento(agendamentoSalvo);
        aula.setLink("https://meet.google.com/seed-test");
        aulaRepository.save(aula);

        // 2. Avaliação (Aluna avalia João)
        Avaliacao aval = new Avaliacao();
        aval.setAluno(alunaAna);
        aval.setInstrutor(instrutorJoao);
        aval.setNota(5);
        aval.setComentario("Professor excelente, explicou tudo sobre Java!");
        aval.setData(LocalDateTime.now());
        avaliacaoRepository.save(aval);

        // Atualização manual da nota:
        // Por usar um Seeder (sem passar pelo Service), atualizamos
        // a nota do João manualmente para refletir a avaliação acima
        LOGGER.info("Atualizando nota do Instrutor João Pereira após avaliação...");
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
        
        // Começam sem nenhuma avaliaçào
        u.setAvaliacao(null); 
        
        String primeiroNome = nome.split(" ")[0].toLowerCase();
        u.setFotoPerfilUrl(baseUrl + "perfil-" + primeiroNome + ".jpg");
        u.setCertificado(baseUrl + "cert-" + primeiroNome + ".pdf");
        
        u.setTopicosEspecialidade(topicos);
        return usuarioRepository.save(u);
    }
}
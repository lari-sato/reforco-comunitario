package back.api.model.entity;

import back.api.enums.StatusEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "SolicitacaoVideoaula")
public class SolicitacaoVideoaula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_solicitacao")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", insertable = true, updatable = true)
    private Usuario aluno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", insertable = false, updatable = false)
    private Usuario instrutor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_topico", nullable = false)
    private Topico topico;

    @Column(name = "descricao_solicitacao", columnDefinition = "TEXT")
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusEnum status;

    @Column(name = "arquivo_video", length = 255)
    private String arquivoVideo;

    @Column(name = "data_solicitacao", nullable = false)
    private LocalDateTime dataSolicitacao;
}

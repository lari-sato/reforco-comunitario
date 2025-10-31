package back.api.model.entity;

import back.api.enums.StatusEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "SolicitacaoVideoaula")
public class SolicitacaoVideoaula {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_solicitacao")
    private UUID id_solicitacao;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_aluno")
    private UUID id_aluno;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_instrutor")
    private UUID id_instrutor;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_topico")
    private UUID id_topico;

    @Column(name = "descricao_solicitacao")
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusEnum status;

    @Column(name = "arquivo_video", length = 255)
    private String video;

    @Column(name = "data_solicitacao")
    private LocalDateTime data;
}
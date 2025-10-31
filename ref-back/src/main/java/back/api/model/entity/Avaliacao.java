package back.api.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "Avaliacao")
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_avaliacao")
    private UUID id_avaliacao;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_aluno")
    private UUID id_aluno;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_instrutor")
    private UUID id_instrutor;

    @Column(name = "nota", nullable = false)
    private Integer nota;

    @Column(name = "comentario")
    private String comentario;

    @Column(name = "data_hora")
    private LocalDateTime data;
}
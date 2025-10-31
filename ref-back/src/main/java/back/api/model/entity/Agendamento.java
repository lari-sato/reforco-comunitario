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
@Table(name = "Agendamento")
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_agendamento")
    private UUID id_agendamento;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_aluno")
    private UUID id_aluno;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_instrutor")
    private UUID id_instrutor;

    @Column(name = "data_hora", nullable = false)
    private LocalDateTime data_hora;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusEnum status;
}
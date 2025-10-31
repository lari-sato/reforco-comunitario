package back.api.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "Aula")
public class Aula {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_aula")
    private UUID id_aula;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_agendamento")
    private UUID id_agendamento;

    @Column(name = "link_videochamada", length = 255)
    private String link;
}
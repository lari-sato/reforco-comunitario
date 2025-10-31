package back.api.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "Topico")
public class Topico {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_topico")
    private UUID id;

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;
}
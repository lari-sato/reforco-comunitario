package back.api.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "Instrutor_Topico")
public class Instrutor_Topico {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_usuario_instrutor")
    private UUID id_usuario_instrutor;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_topico")
    private UUID id_topico;
}
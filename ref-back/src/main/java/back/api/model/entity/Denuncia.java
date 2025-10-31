package back.api.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "Denuncia")
public class Denuncia {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_denuncia")
    private UUID id_denuncia;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_denunciante")
    private UUID id_denunciante;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_denunciado")
    private UUID id_denunciado;

    @Column(name = "motivo", nullable = false)
    private String motivo;

    @Column(name = "data_hora")
    private LocalDateTime data;
}
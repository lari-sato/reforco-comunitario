package back.api.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "Denuncia")
public class Denuncia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_denuncia")
    private Long id;

    // Usuário que realizou a denúncia
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_denunciante", nullable = false)
    private Usuario denunciante;

    // O usuário que foi denunciado
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_denunciado", nullable = false)
    private Usuario denunciado;

    @Column(name = "motivo", nullable = false)
    private String motivo;

    @Column(name = "data_hora")
    private LocalDateTime dataHora;
}
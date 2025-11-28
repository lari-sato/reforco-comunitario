package back.api.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "Avaliacao")
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_avaliacao")
    private Long id_avaliacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_instrutor", referencedColumnName = "id_usuario", nullable = false)
    @Where(clause = "tipo_usuario = 'INSTRUTOR' OR tipo_usuario = 'AMBOS'")
    private Usuario instrutor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_aluno", referencedColumnName = "id_usuario", nullable = false)
    @Where(clause = "tipo_usuario = 'ALUNO' OR tipo_usuario = 'AMBOS'")
    private Usuario aluno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_topico")
    private Topico topico;

    @Column(name = "nota", nullable = false)
    private Integer nota;

    @Column(name = "comentario")
    private String comentario;

    @Column(name = "data_hora")
    private LocalDateTime data;
}
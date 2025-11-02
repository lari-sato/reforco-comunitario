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
@Table(name = "Agendamento")
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_agendamento")
    private Long id_agendamento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_aluno", referencedColumnName = "id_usuario", insertable = true, updatable = true)
    @Where(clause = "tipo_usuario = 'ALUNO'")
    private Usuario aluno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_instrutor", referencedColumnName = "id_usuario", insertable = false, updatable = false)
    @Where(clause = "tipo_usuario = 'INSTRUTOR'")
    private Usuario instrutor;

    @Column(name = "data_hora", nullable = false)
    private LocalDateTime data_hora;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusEnum status;

    @OneToOne(mappedBy = "agendamento", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Aula aula;
}
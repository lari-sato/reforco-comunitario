package back.api.model.entity;

import back.api.enums.EscolaridadeEnum;
import back.api.enums.TipoEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.math.BigDecimal;


@Entity
@Getter
@Setter
@Table(name = "Usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long id;

    @Column(name = "nome", nullable = false, length = 255)
    private String nome;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "senha", nullable = false, length = 255)
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_usuario", nullable = false)
    private TipoEnum tipo;

    @Enumerated(EnumType.STRING)
    @Column(name = "escolaridade", nullable = false)
    private EscolaridadeEnum escolaridade;

    @Column(name = "avaliacao_media", precision = 3, scale = 2)
    private BigDecimal avaliacao;

    @Column(name = "caminho_certificado", length = 255)
    private String certificado;

    @Column(name = "foto_perfil_url", length = 255)
    private String fotoPerfilUrl;

    // Apenas para usuários que são INSTRUTOR ou AMBOS
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "Instrutor_Topico",
            joinColumns = @JoinColumn(name = "id_usuario_instrutor"),
            inverseJoinColumns = @JoinColumn(name = "id_topico")
    )
    private Set<Topico> topicosEspecialidade = new HashSet<>();
}
package back.api.model.entity;

import back.api.enums.EscolaridadeEnum;
import back.api.enums.TipoEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "Usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_usuario")
    private UUID id;

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
    private String avaliacao;

    @Column(name = "caminho_certificado", length = 255)
    private String certificado;
}
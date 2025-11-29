package back.api.model.dto;

<<<<<<< Updated upstream
import back.api.enums.EscolaridadeEnum;
import back.api.enums.TipoEnum;
import back.api.model.entity.Usuario;
import jakarta.validation.constraints.*;

public record UsuarioDTO(
        Long id,

        @NotBlank(message = "Nome do usuário é obrigatório")
        @Size(min = 2, max = 255)
        String nome,

        @NotBlank(message = "E-mail é obrigatório")
        @Email(message = "E-mail inválido")
        String email,

        @NotBlank(message = "Senha é obrigatória")
        @Size(max = 255)
        String senha,

        @NotNull(message = "Tipo de usuário é obrigatório")
        TipoEnum tipo,

        @NotNull(message = "Escolaridade é obrigatória")
        EscolaridadeEnum escolaridade
) {
=======
import back.api.model.entity.Usuario;
import jakarta.validation.constraints.*;

public record UsuarioDTO(Long id,
                         @NotBlank(message = "Nome do usuário é obrigatório")
                         @Size(min = 2, max = 255)
                         String nome,
                         @NotBlank(message = "E-mail é obrigatório")
                         @Email(message = "E-mail inválido")
                         String email,
                         @NotBlank(message = "Senha é obrigatória")
                         @Size(max = 255)
                         String senha) {
>>>>>>> Stashed changes

    public static UsuarioDTO fromEntity(Usuario usuario) {
        return new UsuarioDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
<<<<<<< Updated upstream
                null,
                usuario.getTipo(),
                usuario.getEscolaridade()
=======
                null
>>>>>>> Stashed changes
        );
    }

    public Usuario toEntity() {
        Usuario usuario = new Usuario();
<<<<<<< Updated upstream
        usuario.setNome(this.nome());
        usuario.setEmail(this.email());
        usuario.setSenha(this.senha());
        usuario.setTipo(this.tipo());
        usuario.setEscolaridade(this.escolaridade());
        return usuario;
    }
}
=======
        usuario.setId(this.id());
        usuario.setNome(this.nome());
        usuario.setEmail(this.email());
        usuario.setSenha(this.senha());
        return usuario;
    }

}
>>>>>>> Stashed changes

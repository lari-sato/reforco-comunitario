package back.api.model.dto;

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

    public static UsuarioDTO fromEntity(Usuario usuario) {
        return new UsuarioDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                null
        );
    }

    public Usuario toEntity() {
        Usuario usuario = new Usuario();
        usuario.setId(this.id());
        usuario.setNome(this.nome());
        usuario.setEmail(this.email());
        usuario.setSenha(this.senha());
        return usuario;
    }

}

package back.api.repository;


import back.api.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {

    @Query("SELECT u FROM Usuario u WHERE u.id_usuario = :id")
    Usuario perfilInstrutor(@Param("id") UUID id);

    Usuario verPerfil(UUID id);

    Usuario buscaPorEmail(String email);

    void salvar(Usuario usuario);
}
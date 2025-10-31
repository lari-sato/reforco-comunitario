package back.api.repository;


import back.api.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {

    Usuario buscaPorEmail(String email);
}
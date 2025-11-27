package back.api.repository;

import back.api.model.dto.UsuarioDTO;
import back.api.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    @Query("SELECT i FROM Usuario i JOIN i.topicosEspecialidade t WHERE t.nome IN :nomesTopicos")
    List<UsuarioDTO> findByTopico(@Param("nomesTopicos") List<String> nomesTopicos);
}
package back.api.repository;

import back.api.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull; // Importação necessária

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    // anotações @Override e @NonNull (exigidas pelo JpaRepository)
    @Override
    @NonNull
    Optional<Usuario> findById(@NonNull Long id);

    @Query("SELECT i FROM Usuario i JOIN i.topicosEspecialidade t WHERE t.nome IN :nomesTopicos")
    List<Usuario> findByTopico(@Param("nomesTopicos") List<String> nomesTopicos);

    @Query("SELECT u FROM Usuario u WHERE u.id = :id")
    Usuario perfilInstrutor(@Param("id") Long id);
}
package back.api.repository;


import back.api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario buscarPorEmail(String email);

    List<Usuario> buscarPorMateria(List<String> materias);
}
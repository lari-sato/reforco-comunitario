package back.api.repository;


import back.api.model.entity.Instrutor_Topico;
import back.api.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InstrutorTopicoRepository extends JpaRepository<Instrutor_Topico, String> {

    List<Usuario> buscarPorMateria(List<String> materias);
}
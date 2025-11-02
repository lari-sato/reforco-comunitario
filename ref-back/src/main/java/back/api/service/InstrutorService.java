package back.api.service;


import back.api.model.entity.Usuario;
import back.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstrutorService {

    @Autowired
    private UsuarioRepository usuarioRepository;


    public List<Usuario> buscarPorMateria(List<String> materias) {
        return usuarioRepository.findByTopico(materias);
    }

    public Usuario perfilInstrutor(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }
}

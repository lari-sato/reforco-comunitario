package back.api.service;


import back.api.model.entity.Usuario;
import back.api.repository.InstrutorTopicoRepository;
import back.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class InstrutorService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private InstrutorTopicoRepository instrutorTopicoRepository;

    public List<Usuario> buscarPorMateria(List<String> materias) {
        return instrutorTopicoRepository.buscarPorMateria(materias);
    }

    public Usuario perfilInstrutor(UUID id) {
        return usuarioRepository.findById(id).orElse(null);
    }
}

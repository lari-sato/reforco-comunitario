package back.api.service;


import back.api.model.Usuario;
import back.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario findByEmail(String email) {
        return usuarioRepository.buscarPorEmail(email);
    }

    public List<Usuario> buscarPorMateria(List<String> materias) {
        return usuarioRepository.buscarPorMateria(materias);
    }
}

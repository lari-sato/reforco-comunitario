package back.api.service;


import back.api.model.dto.UsuarioDTO;
import back.api.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstrutorService {

    @Autowired
    private UsuarioRepository usuarioRepository;


    public List<UsuarioDTO> buscarPorMateria(List<String> materias) {
        return usuarioRepository.findByTopico(materias);
    }

    public UsuarioDTO perfilInstrutor(Long id) {
        UsuarioDTO instrutor = UsuarioDTO.fromEntity(usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Instrutor com ID " + id + " não encontrado!")));

        return instrutor;
    }
}

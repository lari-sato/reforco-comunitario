package back.api.service;

import back.api.enums.TipoEnum;
import back.api.model.dto.UsuarioDTO;
import back.api.model.entity.Usuario;
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
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Instrutor com ID " + id + " não encontrado!"));

        if (usuario.getTipo() != TipoEnum.Instrutor && usuario.getTipo() != TipoEnum.Ambos) {
            throw new EntityNotFoundException("Usuário com ID " + id + " não é instrutor ou tutor válido!");
        }

        return UsuarioDTO.fromEntity(usuario);
    }
}
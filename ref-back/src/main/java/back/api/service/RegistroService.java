package back.api.service;

import back.api.model.AuthResponse;
import back.api.model.dto.UsuarioDTO;
import back.api.model.entity.Usuario;
import back.api.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RegistroService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponse login(String email, String senha) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuário com e-mail " + email + " não encontrado!"));;
        if (usuario.getSenha().equals(senha)) {
            return new AuthResponse(true, usuario.getId(), usuario.getNome()); // Login bem-sucedido
        }

        return new AuthResponse(false, null, null);
    }

    @Transactional
    public UsuarioDTO cadastro(UsuarioDTO usuario) {
        Usuario novoUsuario = usuario.toEntity();
        Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);
        return UsuarioDTO.fromEntity(usuarioSalvo);
    }

    public UsuarioDTO encontraId(Long id) {
        Usuario user = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário com id " + id + " não encontrado!"));
        return UsuarioDTO.fromEntity(user);
    }
}
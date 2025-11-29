package back.api.service;

import back.api.model.dto.UsuarioDTO;
import back.api.model.entity.SolicitacaoVideoaula;
import back.api.model.entity.Usuario;
import back.api.repository.SolicitacaoRepository;
import back.api.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    public UsuarioDTO verPerfil(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário com ID " + id + " não encontrado!"));

        return UsuarioDTO.fromEntity(usuario);
    }

    public List<SolicitacaoVideoaula> solicitacoes(Long id) {
        return Collections.singletonList(
                solicitacaoRepository.findById(id).orElse(null)
        );
    }

    public UsuarioDTO editarUsuario(Long id, UsuarioDTO dadosAtualizados) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário com ID " + id + " não encontrado!"));

        if (dadosAtualizados.nome() != null && !dadosAtualizados.nome().isBlank()) {
            usuario.setNome(dadosAtualizados.nome());
        }

        if (dadosAtualizados.senha() != null && !dadosAtualizados.senha().isBlank()) {
            usuario.setSenha(dadosAtualizados.senha());
        }

        if (dadosAtualizados.tipo() != null) {
            usuario.setTipo(dadosAtualizados.tipo());
        }

        if (dadosAtualizados.escolaridade() != null) {
            usuario.setEscolaridade(dadosAtualizados.escolaridade());
        }

        Usuario salvo = usuarioRepository.save(usuario);
        return UsuarioDTO.fromEntity(salvo);
    }
}
package back.api.service;


import back.api.model.dto.UsuarioDTO;
import back.api.model.entity.SolicitacaoVideoaula;
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
        UsuarioDTO usuario = UsuarioDTO.fromEntity(usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Instrutor com ID " + id + " não encontrado!")));

        return usuario;
    }

    public List<SolicitacaoVideoaula> solicitacoes(Long id) {
        return Collections.singletonList(solicitacaoRepository.findById(id).orElse(null));
    }
}

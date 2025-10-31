package back.api.service;


import back.api.model.entity.SolicitacaoVideoaula;
import back.api.model.entity.Usuario;
import back.api.repository.SolicitacaoRepository;
import back.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    public Usuario verPerfil(UUID id) {
        return usuarioRepository.verPerfil(id);
    }

    public List<SolicitacaoVideoaula> solicitacoes(UUID id) {
        return solicitacaoRepository.solicitacoes(id);
    }
}

package back.api.controller;

import back.api.model.entity.SolicitacaoVideoaula;
import back.api.model.entity.Usuario;
import  back.api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/perfil")
    public Usuario verPerfil(@RequestParam UUID id) {
        return usuarioService.verPerfil(id);
    }

    @GetMapping("/solicitacoes")
    public List<SolicitacaoVideoaula> solicitacoes(@RequestParam UUID id) {
        return usuarioService.solicitacoes(id);
    }
}
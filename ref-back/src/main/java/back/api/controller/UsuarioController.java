package back.api.controller;

import back.api.model.entity.Usuario;
import  back.api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instrutores")
@CrossOrigin(origins = "*") // permite acesso do front-end
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/materias")
    public List<Usuario> buscarPorMateria(@RequestParam List<String> materias) {
        return usuarioService.buscarPorMateria(materias);
    }
}
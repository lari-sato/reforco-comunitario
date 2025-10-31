package back.api.controller;

import back.api.model.entity.Usuario;
import back.api.service.RegistroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequestMapping("/api/registro")
public class RegistroController {

    @Autowired
    private RegistroService registroService;

    @GetMapping("/login")
    public Usuario login(@RequestParam String email, String senha) {
        return registroService.login(email, senha);
    }

    @PostMapping("/cadastro")
    public boolean cadastro(@RequestBody Usuario usuario) {
        return registroService.cadastro(usuario);
    }
}
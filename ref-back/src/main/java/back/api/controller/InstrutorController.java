package back.api.controller;

import back.api.model.entity.Usuario;
import back.api.service.InstrutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/instrutores")
public class InstrutorController {

    @Autowired
    private InstrutorService instrutorService;

    @GetMapping("/busca")
    public List<Usuario> buscarPorMateria(@RequestParam List<String> materias) {
        return instrutorService.buscarPorMateria(materias);
    }

    @GetMapping("/perfil_instrutor")
    public Usuario perfilInstrutor(@RequestParam UUID id) {
        return instrutorService.perfilInstrutor(id);
    }
}
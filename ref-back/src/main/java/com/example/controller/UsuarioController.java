package com.example.controller;

import com.example.model.Instrutor;
import com.example.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // permite acesso do front-end
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/instrutores/materias")
    public List<Instrutor> buscarPorMateria(@RequestParam List<String> materias) {
        return usuarioService.buscarPorMateria(materias);
    }
}

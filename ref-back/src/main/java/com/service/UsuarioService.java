package com.example.service;

import com.example.model.Instrutor;
import com.example.model.Usuario;
import com.example.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario findByEmail(String email) {
        return usuarioRepository.buscarPorEmail(email);
    }

    public List<Instrutor> buscarPorMateria(List<String> materias) {
        return usuarioRepository.buscarPorMateria(materias);
    }
}

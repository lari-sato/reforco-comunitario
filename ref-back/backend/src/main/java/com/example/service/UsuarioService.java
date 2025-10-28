package com.example.service;

import com.example.model.Instrutor;
import com.example.model.Usuario;
import com.example.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean registerUser(Usuario usuario) {
        if (usuarioRepository.buscarPorEmail(usuario.getEmail()) != null) return false; // Se o e-mail já existe retorna falso
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuarioRepository.save(usuario);
        return true;
    }

    public Usuario findByEmail(String email) {
        return usuarioRepository.buscarPorEmail(email);
    }

    public List<Instrutor> buscarPorMateria(List<String> materias) {
        return usuarioRepository.buscarPorMateria(materias);
    }
}
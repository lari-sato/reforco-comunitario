package com.example.service;


import com.example.model.Usuario;

public interface UsuarioInterface {
    void save(Usuario usuario);

    Usuario findByEmail(String email);
    
    List<Instrutor> buscarPorMateria(List<String> materias);
}

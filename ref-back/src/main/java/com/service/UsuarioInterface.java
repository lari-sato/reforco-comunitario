package com.example.service;


import com.example.model.Usuario;
import com.example.model.Insrutor;

import java.util.List;


public interface UsuarioInterface {
    void save(Usuario usuario);

    Usuario findByEmail(String email);
    
    List<Instrutor> buscarPorMateria(List<String> materias);
}

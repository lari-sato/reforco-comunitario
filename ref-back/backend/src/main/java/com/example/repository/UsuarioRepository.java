package com.example.repository;

import com.example.model.Instrutor;
import com.example.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario buscarPorEmail(String email);

    List<Instrutor> buscarPorMateria(List<String> materias);
}
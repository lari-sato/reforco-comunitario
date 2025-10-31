package back.api.service;


import back.api.model.Usuario;

import java.util.List;


public interface UsuarioInterface {
    void save(Usuario usuario);

    Usuario findByEmail(String email);
    
    List<Usuario> buscarPorMateria(List<String> materias);
}

package back.api.controller;

import back.api.model.entity.Usuario;
import back.api.service.RegistroService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Registro")
@RequestMapping("/api/registro")
public class RegistroController {

    @Autowired
    private RegistroService registroService;

    @Operation(
            summary = "Login",
            description = "Realiza login do usuário e retorna o perfil correspondente caso credenciais estejam certas",
            responses = {
                    @ApiResponse(
                            description = "Sucesso",
                            responseCode = "200"
                    ),
                    @ApiResponse(
                            description = "Erro interno",
                            responseCode = "500"
                    )
            }
    )
    @GetMapping("/login")
    public Usuario login(@RequestParam String email, String senha) {
        return registroService.login(email, senha);
    }

    @Operation(
            summary = "Cadastro de usuário",
            description = "Recebe dados digitados pelo usuário e cadastra no sistema",
            responses = {
                    @ApiResponse(
                            description = "Sucesso",
                            responseCode = "200"
                    ),
                    @ApiResponse(
                            description = "Erro interno",
                            responseCode = "500"
                    )
            }
    )
    @PostMapping("/cadastro")
    public boolean cadastro(@RequestBody Usuario usuario) {
        return registroService.cadastro(usuario);
    }
}
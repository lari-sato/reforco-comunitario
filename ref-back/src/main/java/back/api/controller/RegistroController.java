package back.api.controller;

import back.api.model.AuthRequest;
import back.api.model.AuthResponse;
import back.api.model.dto.UsuarioDTO;
import back.api.model.entity.Usuario;
import back.api.service.RegistroService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(registroService.login(authRequest.email(), authRequest.senha()));
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
    public ResponseEntity<UsuarioDTO> cadastro(@RequestBody @Valid UsuarioDTO usuario) {
        return ResponseEntity.ok(registroService.cadastro(usuario));
    }
}
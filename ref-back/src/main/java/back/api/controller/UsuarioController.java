package back.api.controller;

import back.api.model.dto.UsuarioDTO;
import back.api.model.entity.SolicitacaoVideoaula;
import  back.api.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Usuários")
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Operation(
            summary = "Editar dados do usuário",
            description = "Atualiza dados do usuário",
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
    @PutMapping("/editar")
    public UsuarioDTO editarUsuario(@RequestParam Long id,
                                    @RequestBody UsuarioDTO dadosAtualizados) {
        return usuarioService.editarUsuario(id, dadosAtualizados);
    }

    @Operation(
            summary = "Ver perfil de usuário",
            description = "Retorna dados do perfil do usuário",
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
    @GetMapping("/perfil")
    public UsuarioDTO verPerfil(@RequestParam Long id) {
        return usuarioService.verPerfil(id);
    }

    @Operation(
            summary = "Mostrar solicitações do usuário",
            description = "Retorna todas as solicitações ligadas ao perfil do usuário",
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
    @GetMapping("/solicitacoes")
    public List<SolicitacaoVideoaula> solicitacoes(@RequestParam Long id) {
        return usuarioService.solicitacoes(id);
    }
}
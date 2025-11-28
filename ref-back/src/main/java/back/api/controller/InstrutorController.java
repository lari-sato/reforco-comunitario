package back.api.controller;

import back.api.model.dto.UsuarioDTO;
import back.api.service.InstrutorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Instrutores")
@RequestMapping("/api/instrutores")
public class InstrutorController {

    @Autowired
    private InstrutorService instrutorService;

    @Operation(
        summary = "Buscar instrutores por matérias que lecionam",
        description = "Retorna todos os instrutores que lecionam a(s) matéria(s) selecionada(s)",
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
    @GetMapping("/busca")
    public List<UsuarioDTO> buscarPorMateria(@RequestParam List<String> materias) {
        return instrutorService.buscarPorMateria(materias);
    }

    @Operation(
            summary = "Mostrar perfil de instrutor",
            description = "Retorna o perfil do instrutor selecionado",
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
    @GetMapping("/perfil_instrutor")
    public UsuarioDTO perfilInstrutor(@RequestParam Long id) {
        return instrutorService.perfilInstrutor(id);
    }
}
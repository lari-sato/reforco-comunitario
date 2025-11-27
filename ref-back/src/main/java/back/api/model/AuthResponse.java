package back.api.model;


public record AuthResponse(
        boolean autenticado,
        Long id,
        String nome
) {}
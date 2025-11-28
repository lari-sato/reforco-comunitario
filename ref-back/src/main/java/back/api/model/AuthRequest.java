package back.api.model;

public record AuthRequest(
        String email,
        String senha
) {}

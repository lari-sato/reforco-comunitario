package back.api.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum TipoEnum {
    Aluno("ALUNO"),
    Instrutor("INSTRUTOR"),
    Ambos("AMBOS");

    private String tipo;
}
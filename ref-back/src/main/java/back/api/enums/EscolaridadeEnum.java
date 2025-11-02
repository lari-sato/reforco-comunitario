package back.api.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EscolaridadeEnum {
    FundInc("FUNDAMENTAL INCOMPLETO"),
    FundComp("FUNDAMENTAL COMPLETO"),
    MedioInc("MÉDIO INCOMPLETO"),
    MedioComp("MÉDIO COMPLETO"),
    SupInc("SUPERIOR INCOMPLETO"),
    SupComp("SUPERIOR COMPLETO");

    private String escolaridade;
}
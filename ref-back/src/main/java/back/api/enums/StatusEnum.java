package back.api.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatusEnum {
    Solicitado("SOLCICITADO"),
    Aceito("ACEITO"),
    Recusado("RECUSADO"),
    Cancelado("CANCELADO");

    private String status;
}
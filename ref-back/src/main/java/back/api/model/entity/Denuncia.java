//package back.api.model.entity;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//
//import java.time.LocalDateTime;
//
//@Entity
//@Getter
//@Setter
//@Table(name = "Denuncia")
//public class Denuncia {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id_denuncia")
//    private Long id_denuncia;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "id_usuario", nullable = false)
//    private Usuario id_denunciante;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "id_usuario", nullable = false)
//    private Usuario id_denunciado;
//
//    @Column(name = "motivo", nullable = false)
//    private String motivo;
//
//    @Column(name = "data_hora")
//    private LocalDateTime data;
//}
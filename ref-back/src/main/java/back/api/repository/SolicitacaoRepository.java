package back.api.repository;


import back.api.model.entity.SolicitacaoVideoaula;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolicitacaoRepository extends JpaRepository<SolicitacaoVideoaula, Long> {

}
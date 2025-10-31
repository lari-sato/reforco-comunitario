package back.api.repository;


import back.api.model.entity.SolicitacaoVideoaula;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SolicitacaoRepository extends JpaRepository<SolicitacaoVideoaula, UUID> {

    List<SolicitacaoVideoaula> solicitacoes(UUID id);
}
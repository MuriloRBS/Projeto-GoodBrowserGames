package br.ApenasBombados.backend.repository;

import org.springframework.stereotype.Repository;

import br.ApenasBombados.backend.entity.MembroGameAvaliacao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface MembroGameAvaliacaoRepository extends JpaRepository<MembroGameAvaliacao, Long> {
    public Optional<MembroGameAvaliacao> findByMembroIdAndBrowserGameId(long membroId, long browserGameId);

    public Optional<List<MembroGameAvaliacao>> findByBrowserGameId(Long gameId);
}

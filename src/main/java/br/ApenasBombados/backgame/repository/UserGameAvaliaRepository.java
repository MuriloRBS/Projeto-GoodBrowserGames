package br.ApenasBombados.backgame.repository;

import org.springframework.stereotype.Repository;

import br.ApenasBombados.backgame.entity.UsuarioGameAvalia;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserGameAvaliaRepository extends JpaRepository<UsuarioGameAvalia, Long> {
    public Optional<UsuarioGameAvalia> findByMembroIdAndBrowserGameId(long membroId, long browserGameId);

    public Optional<List<UsuarioGameAvalia>> findByBrowserGameId(Long gameId);
}

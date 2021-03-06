package br.ApenasBombados.backend.repository;

import org.springframework.stereotype.Repository;

import br.ApenasBombados.backend.entity.BrowserGame;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface BrowserGameRepository extends JpaRepository<BrowserGame, Long> {
    public Optional<List<BrowserGame>> findByNomeContaining(String gameName);
}
package br.ApenasBombados.backend.repository;

import org.springframework.stereotype.Repository;

import br.ApenasBombados.backend.entity.Avaliacao;
import br.ApenasBombados.backend.entity.Membro;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface MembroRepository extends JpaRepository<Membro, Long> {
    public Optional<Membro> findByUsername(String username);
}
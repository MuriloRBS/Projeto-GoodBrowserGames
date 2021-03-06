package br.ApenasBombados.backend.repository;

import org.springframework.stereotype.Repository;

import br.ApenasBombados.backend.entity.Avaliacao;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

}
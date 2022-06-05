package br.ApenasBombados.backgame.repository;

import org.springframework.stereotype.Repository;

import br.ApenasBombados.backgame.entity.Avalia;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface AvaliaRepository extends JpaRepository<Avalia, Long> {

}
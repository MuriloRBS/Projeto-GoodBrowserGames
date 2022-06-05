package br.ApenasBombados.backend.repository;

import org.springframework.stereotype.Repository;

import br.ApenasBombados.backend.entity.Avalia;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface AvaliaRepository extends JpaRepository<Avalia, Long> {

}
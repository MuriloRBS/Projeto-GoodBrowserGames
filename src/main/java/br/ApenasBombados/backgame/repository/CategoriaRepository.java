package br.ApenasBombados.backgame.repository;

import org.springframework.stereotype.Repository;

import br.ApenasBombados.backgame.entity.Categoria;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    public Optional<Categoria> findByNome(String nome);
}
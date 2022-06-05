package br.ApenasBombados.backgame.repository;

import org.springframework.stereotype.Repository;

import br.ApenasBombados.backgame.entity.Avalia;
import br.ApenasBombados.backgame.entity.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    public Optional<Usuario> findByUsername(String username);
}
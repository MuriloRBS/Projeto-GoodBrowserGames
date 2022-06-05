package br.ApenasBombados.backend.repository;

import org.springframework.stereotype.Repository;

import br.ApenasBombados.backend.entity.Avalia;
import br.ApenasBombados.backend.entity.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    public Optional<Usuario> findByUsername(String username);
}
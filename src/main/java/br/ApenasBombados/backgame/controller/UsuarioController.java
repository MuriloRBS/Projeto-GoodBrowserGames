package br.ApenasBombados.backgame.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.ApenasBombados.backgame.entity.Avalia;
import br.ApenasBombados.backgame.entity.BrowserGame;
import br.ApenasBombados.backgame.entity.Categoria;
import br.ApenasBombados.backgame.entity.Usuario;
import br.ApenasBombados.backgame.repository.AvaliaRepository;
import br.ApenasBombados.backgame.repository.BrowserGameRepository;
import br.ApenasBombados.backgame.repository.CategoriaRepository;
import br.ApenasBombados.backgame.repository.UsuarioRepository;

@RestController
public class UsuarioController {
    @Autowired
    private UsuarioRepository repository;

    @RequestMapping(value = "/membros", method = RequestMethod.GET)
    public List<Usuario> getAvaliacoes() {
        return repository.findAll();
    }

    @RequestMapping(value = "/membros/{id}", method = RequestMethod.GET)
    public ResponseEntity<Usuario> getById(@PathVariable(value = "id") long id) {
        Optional<Usuario> response = repository.findById(id);
        if (response.isPresent()) {
            return new ResponseEntity<Usuario>(response.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/membros/{username}/{password}", method = RequestMethod.GET)
    public ResponseEntity<Usuario> getByUsername(@PathVariable(value = "username") String username,
            @PathVariable(value = "password") String password) {
        Optional<Usuario> response = repository.findByUsername(username);
        if (response.isPresent()) {
            if (response.get().getSenha().equals(password)) {
                return new ResponseEntity<Usuario>(response.get(), HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/membros", method = RequestMethod.POST)
    public ResponseEntity<Usuario> createMembro(@Valid @RequestBody Usuario membro) {
        Optional<Usuario> response = repository.findByUsername(membro.getUsername());
        if (response.isPresent()) {
            return new ResponseEntity<Usuario>(HttpStatus.CONFLICT);
        } else {
            repository.save(membro); // salva no banco
            return new ResponseEntity<Usuario>(membro, HttpStatus.CREATED);
        }
    }

    @RequestMapping(value = "/membros/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Usuario> Put(@PathVariable(value = "id") long id,
            @Valid @RequestBody Usuario newMembro) {
        Optional<Usuario> oldMembro = repository.findById(id);
        if (oldMembro.isPresent()) {
            Usuario membro = oldMembro.get();
            membro.setDataNascimento(newMembro.getDataNascimento());
            membro.setEstado(newMembro.getEstado());
            membro.setNomeCompleto(newMembro.getNomeCompleto());
            membro.setPais(newMembro.getPais());
            membro.setSenha(newMembro.getSenha());
            membro.setUsername(newMembro.getUsername());
            membro.setIsEditor(newMembro.getIsEditor());
            repository.save(membro);
            return new ResponseEntity<Usuario>(membro, HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/membros/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> Delete(@PathVariable(value = "id") long id) {
        Optional<Usuario> membro = repository.findById(id);
        if (membro.isPresent()) {
            repository.delete(membro.get());
            return new ResponseEntity<>(HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
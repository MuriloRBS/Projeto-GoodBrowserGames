package br.ApenasBombados.backend.controller;

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

import br.ApenasBombados.backend.entity.Avalia;
import br.ApenasBombados.backend.entity.BrowserGame;
import br.ApenasBombados.backend.entity.Categoria;
import br.ApenasBombados.backend.repository.AvaliaRepository;
import br.ApenasBombados.backend.repository.BrowserGameRepository;
import br.ApenasBombados.backend.repository.CategoriaRepository;

@RestController
public class AvaliaController {
    @Autowired
    private AvaliaRepository repository;

    @RequestMapping(value = "/avaliacoes", method = RequestMethod.GET)
    public List<Avalia> getAvaliacoes() {
        return repository.findAll();
    }

    @RequestMapping(value = "/avaliacoes/{id}", method = RequestMethod.GET)
    public ResponseEntity<Avalia> getById(@PathVariable(value = "id") long id) {
        Optional<Avalia> response = repository.findById(id);
        if (response.isPresent()) {
            return new ResponseEntity<Avalia>(response.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/avaliacoes", method = RequestMethod.POST)
    public Avalia createAvaliacao(@Valid @RequestBody Avalia avaliacao) {
        return repository.save(avaliacao); // salva no banco
    }

    @RequestMapping(value = "/avaliacoes/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Avalia> Put(@PathVariable(value = "id") long id,
            @Valid @RequestBody Avalia newAvaliacao) {
        Optional<Avalia> oldAvaliacao = repository.findById(id);
        if (oldAvaliacao.isPresent()) {
            Avalia avaliacao = oldAvaliacao.get();
            avaliacao.setEstrelas(newAvaliacao.getEstrelas());
            avaliacao.setData(newAvaliacao.getData());
            avaliacao.setTexto(newAvaliacao.getTexto());
            repository.save(avaliacao);
            return new ResponseEntity<Avalia>(avaliacao, HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/avaliacoes/like/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Avalia> Put(@PathVariable(value = "id") long id) {
        Optional<Avalia> oldAvaliacao = repository.findById(id);
        if (oldAvaliacao.isPresent()) {
            oldAvaliacao.get().setLikes(oldAvaliacao.get().getLikes() + 1);
            repository.save(oldAvaliacao.get());
            return new ResponseEntity<Avalia>(oldAvaliacao.get(), HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/avaliacoes/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> Delete(@PathVariable(value = "id") long id) {
        Optional<Avalia> avaliacao = repository.findById(id);
        if (avaliacao.isPresent()) {
            repository.delete(avaliacao.get());
            return new ResponseEntity<>(HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
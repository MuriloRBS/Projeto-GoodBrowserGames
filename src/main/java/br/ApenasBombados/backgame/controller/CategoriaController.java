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

import br.ApenasBombados.backgame.entity.Categoria;
import br.ApenasBombados.backgame.repository.CategoriaRepository;

@RestController
public class CategoriaController {
    @Autowired
    private CategoriaRepository repository;

    @RequestMapping(value = "/categorias", method = RequestMethod.GET)
    public List<Categoria> getCategorias() {
        return repository.findAll();
    }

    @RequestMapping(value = "/categorias", method = RequestMethod.POST)
    public ResponseEntity<Categoria> createCategoria(@Valid @RequestBody Categoria categoria) {
        Optional<Categoria> response = repository.findByNome(categoria.getNome());
        if (response.isPresent()) {
            return new ResponseEntity<Categoria>(HttpStatus.CONFLICT);
        } else {
            repository.save(categoria);
            return new ResponseEntity<Categoria>(categoria, HttpStatus.CREATED);
        }
    }

    @RequestMapping(value = "/categorias/{id}", method = RequestMethod.GET)
    public ResponseEntity<Categoria> getById(@PathVariable(value = "id") long id) {
        Optional<Categoria> response = repository.findById(id);
        if (response.isPresent()) {
            return new ResponseEntity<Categoria>(response.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/categorias/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Categoria> Put(@PathVariable(value = "id") long id,
            @Valid @RequestBody Categoria newCategoria) {
        Optional<Categoria> oldCategoria = repository.findById(id);
        if (oldCategoria.isPresent()) {
            Categoria categoria = oldCategoria.get();
            categoria.setNome(newCategoria.getNome());
            categoria.setDescricao(newCategoria.getDescricao());
            repository.save(categoria);
            return new ResponseEntity<Categoria>(categoria, HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/categorias/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> Delete(@PathVariable(value = "id") long id) {
        Optional<Categoria> categoria = repository.findById(id);
        if (categoria.isPresent()) {
            repository.delete(categoria.get());
            return new ResponseEntity<>(HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
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

import br.ApenasBombados.backend.entity.BrowserGame;
import br.ApenasBombados.backend.entity.Categoria;
import br.ApenasBombados.backend.repository.BrowserGameRepository;
import br.ApenasBombados.backend.repository.CategoriaRepository;

@RestController
public class BrowserGameController {
    @Autowired
    private BrowserGameRepository repository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @RequestMapping(value = "/browsergames", method = RequestMethod.GET)
    public List<BrowserGame> getBrowserGames() {
        return repository.findAll();
    }

    @RequestMapping(value = "categoria/{idCategoria}/browsergames", method = RequestMethod.POST)
    public ResponseEntity<BrowserGame> createBrowserGame(@Valid @RequestBody BrowserGame browserGame,
            @PathVariable(value = "idCategoria") Long idCategoria) {
        Optional<Categoria> responseCategoria = categoriaRepository.findById(idCategoria);
        if (responseCategoria.isPresent()) {
            browserGame.setCategoria(responseCategoria.get());
            repository.save(browserGame); // salva no banco
            return new ResponseEntity<BrowserGame>(browserGame, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/browsergames/{id}", method = RequestMethod.GET)
    public ResponseEntity<BrowserGame> getById(@PathVariable(value = "id") long id) {
        Optional<BrowserGame> response = repository.findById(id);
        if (response.isPresent()) {
            return new ResponseEntity<BrowserGame>(response.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/browsergames/search/{gameName}", method = RequestMethod.GET)
    public ResponseEntity<List<BrowserGame>> getByName(@PathVariable(value = "gameName") String gameName) {
        Optional<List<BrowserGame>> response = repository.findByNomeContaining(gameName);
        if (response.isPresent()) {
            return new ResponseEntity<List<BrowserGame>>(response.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/browsergames/{id}", method = RequestMethod.PUT)
    public ResponseEntity<BrowserGame> Put(@PathVariable(value = "id") long id,
            @Valid @RequestBody BrowserGame newGame) {
        Optional<BrowserGame> oldGame = repository.findById(id);
        if (oldGame.isPresent()) {
            BrowserGame game = oldGame.get();
            game.setNome(newGame.getNome());
            game.setURL(newGame.getURL());
            game.setDescricao(newGame.getDescricao());
            game.setImagem(newGame.getImagem());
            game.setURLVideo(newGame.getURLVideo());
            repository.save(game);
            return new ResponseEntity<BrowserGame>(game, HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/browsergames/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> Delete(@PathVariable(value = "id") long id) {
        Optional<BrowserGame> game = repository.findById(id);
        if (game.isPresent()) {
            repository.delete(game.get());
            return new ResponseEntity<>(HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
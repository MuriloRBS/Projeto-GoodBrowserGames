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
import br.ApenasBombados.backend.entity.Usuario;
import br.ApenasBombados.backend.entity.UsuarioGameAvalia;
import br.ApenasBombados.backend.repository.AvaliaRepository;
import br.ApenasBombados.backend.repository.BrowserGameRepository;
import br.ApenasBombados.backend.repository.CategoriaRepository;
import br.ApenasBombados.backend.repository.UserGameAvaliaRepository;
import br.ApenasBombados.backend.repository.UsuarioRepository;

@RestController
public class UserGameAvaliaController {
    @Autowired
    private UserGameAvaliaRepository repository;

    @Autowired
    private UsuarioRepository membroRepository;

    @Autowired
    private AvaliaRepository avaliacaoRepository;

    @Autowired
    private BrowserGameRepository browserGameRepository;

    @RequestMapping(value = "/membrosGamesAvaliacoes", method = RequestMethod.GET)
    public List<UsuarioGameAvalia> getAll() {
        return repository.findAll();
    }

    @RequestMapping(value = "/membrosGamesAvaliacoes/{gameId}", method = RequestMethod.GET)
    public ResponseEntity<List<UsuarioGameAvalia>> getByGame(@PathVariable(value = "gameId") Long gameId) {
        Optional<List<UsuarioGameAvalia>> response = repository.findByBrowserGameId(gameId);
        if (response.isPresent()) {
            return new ResponseEntity<List<UsuarioGameAvalia>>(response.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/membrosGamesAvaliacoes/{membroId}/{gameId}/{avaliacaoId}", method = RequestMethod.POST)
    public ResponseEntity<UsuarioGameAvalia> createMembrosGamesAvaliacoes(
            @PathVariable(value = "membroId") long membroId,
            @PathVariable(value = "gameId") long gameId,
            @PathVariable(value = "avaliacaoId") long avaliacaoId) {
        Optional<Usuario> responseMembro = membroRepository.findById(membroId);
        Optional<BrowserGame> responseGame = browserGameRepository.findById(gameId);
        Optional<Avalia> responseAvaliacao = avaliacaoRepository.findById(avaliacaoId);
        Optional<UsuarioGameAvalia> responseMGA = repository.findByMembroIdAndBrowserGameId(membroId, gameId);

        if (!responseMGA.isPresent()) {
            if (responseAvaliacao.isPresent() && responseGame.isPresent() && responseMembro.isPresent()) {
                UsuarioGameAvalia newMGA = new UsuarioGameAvalia();
                newMGA.setAvalia(responseAvaliacao.get());
                newMGA.setBrowserGame(responseGame.get());
                newMGA.setMembro(responseMembro.get());
                return new ResponseEntity<UsuarioGameAvalia>(repository.save(newMGA), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @RequestMapping(value = "/membrosGamesAvaliacoes/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> Delete(@PathVariable(value = "id") long id) {
        Optional<UsuarioGameAvalia> membroGameAvaliacao = repository.findById(id);
        if (membroGameAvaliacao.isPresent()) {
            repository.delete(membroGameAvaliacao.get());
            return new ResponseEntity<>(HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
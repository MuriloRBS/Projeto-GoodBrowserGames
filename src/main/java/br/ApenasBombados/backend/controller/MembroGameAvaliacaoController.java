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

import br.ApenasBombados.backend.entity.Categoria;
import br.ApenasBombados.backend.entity.Membro;
import br.ApenasBombados.backend.entity.MembroGameAvaliacao;
import br.ApenasBombados.backend.entity.Avaliacao;
import br.ApenasBombados.backend.entity.BrowserGame;
import br.ApenasBombados.backend.repository.AvaliacaoRepository;
import br.ApenasBombados.backend.repository.BrowserGameRepository;
import br.ApenasBombados.backend.repository.CategoriaRepository;
import br.ApenasBombados.backend.repository.MembroGameAvaliacaoRepository;
import br.ApenasBombados.backend.repository.MembroRepository;

@RestController
public class MembroGameAvaliacaoController {
    @Autowired
    private MembroGameAvaliacaoRepository repository;

    @Autowired
    private MembroRepository membroRepository;

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private BrowserGameRepository browserGameRepository;

    @RequestMapping(value = "/membrosGamesAvaliacoes", method = RequestMethod.GET)
    public List<MembroGameAvaliacao> getAll() {
        return repository.findAll();
    }

    @RequestMapping(value = "/membrosGamesAvaliacoes/{gameId}", method = RequestMethod.GET)
    public ResponseEntity<List<MembroGameAvaliacao>> getByGame(@PathVariable(value = "gameId") Long gameId) {
        Optional<List<MembroGameAvaliacao>> response = repository.findByBrowserGameId(gameId);
        if (response.isPresent()) {
            return new ResponseEntity<List<MembroGameAvaliacao>>(response.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/membrosGamesAvaliacoes/{membroId}/{gameId}/{avaliacaoId}", method = RequestMethod.POST)
    public ResponseEntity<MembroGameAvaliacao> createMembrosGamesAvaliacoes(
            @PathVariable(value = "membroId") long membroId,
            @PathVariable(value = "gameId") long gameId,
            @PathVariable(value = "avaliacaoId") long avaliacaoId) {
        Optional<Membro> responseMembro = membroRepository.findById(membroId);
        Optional<BrowserGame> responseGame = browserGameRepository.findById(gameId);
        Optional<Avaliacao> responseAvaliacao = avaliacaoRepository.findById(avaliacaoId);
        Optional<MembroGameAvaliacao> responseMGA = repository.findByMembroIdAndBrowserGameId(membroId, gameId);

        if (!responseMGA.isPresent()) {
            if (responseAvaliacao.isPresent() && responseGame.isPresent() && responseMembro.isPresent()) {
                MembroGameAvaliacao newMGA = new MembroGameAvaliacao();
                newMGA.setAvaliacao(responseAvaliacao.get());
                newMGA.setBrowserGame(responseGame.get());
                newMGA.setMembro(responseMembro.get());
                return new ResponseEntity<MembroGameAvaliacao>(repository.save(newMGA), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @RequestMapping(value = "/membrosGamesAvaliacoes/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> Delete(@PathVariable(value = "id") long id) {
        Optional<MembroGameAvaliacao> membroGameAvaliacao = repository.findById(id);
        if (membroGameAvaliacao.isPresent()) {
            repository.delete(membroGameAvaliacao.get());
            return new ResponseEntity<>(HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
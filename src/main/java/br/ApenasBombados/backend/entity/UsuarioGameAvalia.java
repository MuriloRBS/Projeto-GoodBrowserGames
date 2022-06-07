package br.ApenasBombados.backend.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.Table;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Table(name = "membroGameAvaliacao")
public class UsuarioGameAvalia {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinColumn(name = "membro_id", nullable = false)
    private Usuario membro;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinColumn(name = "browserGame_id", nullable = false)
    private BrowserGame browserGame;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinColumn(name = "avaliacao_id", nullable = false)
    private Avaliacao avaliacao;

    public UsuarioGameAvalia() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getMembro() {
        return membro;
    }

    public void setMembro(Usuario membro) {
        this.membro = membro;
    }

    public BrowserGame getBrowserGame() {
        return browserGame;
    }

    public void setBrowserGame(BrowserGame browserGame) {
        this.browserGame = browserGame;
    }

    public Avaliacao getAvalia() {
        return avaliacao;
    }

    public void setAvalia(Avaliacao avaliacao) {
        this.avaliacao = avaliacao;
    }

}
package br.ApenasBombados.backend.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Table(name = "categoria")
public class Categoria {
    @Id // chave primária
    @GeneratedValue(strategy = GenerationType.AUTO) // será gerado automaticamente
    private long id;

    @Column(nullable = false) // Atributo nao pode ser null
    private String nome;

    @Column(nullable = false)
    private String descricao;

    @OneToMany(mappedBy = "categoria", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<BrowserGame> browserGames;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<BrowserGame> getBrowserGames() {
        return this.browserGames;
    }

}

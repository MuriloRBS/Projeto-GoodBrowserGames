package br.ApenasBombados.backgame.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Table(name = "membro")
public class Usuario {
    @Id // chave primária
    @GeneratedValue(strategy = GenerationType.AUTO) // será gerado automaticamente
    private long id;

    @Column(nullable = false)
    private String nomeCompleto;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    private String dataNascimento;

    @Column(nullable = false) // Atributo nao pode ser null
    private String estado;

    @Column(nullable = false) // Atributo nao pode ser null
    private String pais;

    @Column(nullable = false)
    private boolean isEditor;

    @OneToMany(mappedBy = "membro", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<UsuarioGameAvalia> membroGameAvaliacao;

    public Usuario() {

    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNomeCompleto() {
        return this.nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getSenha() {
        return this.senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getDataNascimento() {
        return this.dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getPais() {
        return this.pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Set<UsuarioGameAvalia> getMembroGameAvaliacao() {
        return membroGameAvaliacao;
    }

    public boolean getIsEditor() {
        return isEditor;
    }

    public void setIsEditor(boolean isEditor) {
        this.isEditor = isEditor;
    }
}
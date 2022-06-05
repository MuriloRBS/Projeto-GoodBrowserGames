const apiService = new APIService();

//Função que adiciona um novo jogo à biblioteca
function addCategoria() {
    // Ler campos do formulário
    if ((document.getElementById('nome').value.trim() != "") &&
      (document.getElementById('descricao').value.trim() != '')){
        var categoria = {
            nome: document.getElementById('nome').value.trim(),
            descricao: document.getElementById('descricao').value.trim(),
        }

        apiService.create("/categorias", categoria, function (status, dados) {
            if (status < 200 || status > 299) {
                document.getElementById("mensagem").innerHTML = "<p class='error_message'>Erro ao adicionar um novo jogo: " + status + " - " + dados.message + "</p>";
                return;
            }

            document.getElementById("mensagem").innerHTML = "<p class='good'>Categoria " + categoria.nome + " cadastrado</p>"

            document.getElementById('nome').value = '';
            document.getElementById('descricao').value = '';
        });
    } else {
        document.getElementById("mensagem").innerHTML = "<p class='error_message'>Erro ao cadastrar browserGame - campos em branco</p>";
    }
}

const apiService = new APIService();
var userId = sessionStorage.getItem("user");
var save = sessionStorage.getItem("save");
var avaliacaoId = sessionStorage.getItem("avaliacaoId");



function getAvaliacao() {
        apiService.getById("/avaliacoes", avaliacaoId, function(status, response) {
            if(status < 200 || status > 299 ) {
                document.getElementById("mensagem").innerHTML += "<p class='error_message'>Erro ao carregar os dados: " + status + " - " + json.message + "</p>";
                return;
            }

            console.log(response)
            var texto = response.texto;
            var estrelas = response.estrelas;
            document.getElementById('estrelas').value = estrelas;
            document.getElementById('avaliacao').value = texto;
        });
}

function updateAvaliacao() {
    // Ler campos do formulário
    if ((document.getElementById('estrelas').value != "") &&
     (document.getElementById('avaliacao').value != '')){
        const data = new Date()

        var avaliacao = {
            "estrelas": document.getElementById('estrelas').value,
            "quantidadeLikes": 0,
            "texto": document.getElementById('avaliacao').value.trim(),
            "data": data.toString()
         }


        apiService.updateData("/avaliacoes", avaliacaoId, avaliacao, function(status, dados) {
           if(status < 200 || status > 299 ) {
               document.getElementById("mensagem").innerHTML += "<p class='error_message'>Erro ao atualizar os dados: " + status + " - " + dados.message + "</p>";
               return;
           }

           window.location = "browserGame.html";
       });
        
    } else {
        document.getElementById("mensagem").innerHTML = "<p class='error_message'>Erro ao cadastrar browserGame - campos em branco</p>";
    }
}
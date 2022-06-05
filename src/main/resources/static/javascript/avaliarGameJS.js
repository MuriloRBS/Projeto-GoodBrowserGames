const apiService = new APIService();
var userId = sessionStorage.getItem("user");
var save = sessionStorage.getItem("save");
var avaliacaoId = sessionStorage.getItem("avaliacaoId");



function verifyEdition() {
    if (avaliacaoId != null) {
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
}

function addAvaliacao() {
    if (document.getElementById('avaliacao').value.trim() != "") {
        const data = new Date()

         var avaliacao = {
            "estrelas": document.getElementById('estrelas').value,
            "quantidadeLikes": 0,
            "texto": document.getElementById('avaliacao').value.trim(),
            "data": data.toString()
         }

         apiService.create("/avaliacoes", avaliacao, function (status, dados1) {
            if (status < 200 || status > 299) {
                document.getElementById("mensagem").innerHTML = "<p class='error_message'>Este usuário já existe</p>";
                return;
            }
            
            apiService.create(`/membrosGamesAvaliacoes/${userId}/${save}/${dados1.id}`, avaliacao, function (status, dados) {
                if (status < 200 || status > 299) {
                    document.getElementById("mensagem").innerHTML = "<p class='error_message'>Este usuário já existe</p>";
                    return;
                }
    
                document.getElementById("mensagem").innerHTML = "<p class='good'>Avaliação cadastrada</p>"
    
                document.getElementById('avaliacao').value = '';
            });
        });

        
     } else {
        document.getElementById("mensagem").innerHTML = "<p class='error_message'>Erro ao cadastrar avaliação - campos em branco</p>";
    }
}
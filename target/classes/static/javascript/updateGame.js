var save = sessionStorage.getItem("save");
const apiService = new APIService();


function getBrowserGame(){
    apiService.getById("/browsergames", save, function(status, response) {
        if(status < 200 || status > 299 ) {
            document.getElementById("mensagem").innerHTML += "<p class='error_message'>Erro ao carregar os dados: " + status + " - " + json.message + "</p>";
            return;
        }

        var img = response.imagem;
        var nome = response.nome;
        var descricao = response.descricao;
        var url = response.url;
        var urlvideo = response.urlvideo
        console.log(response.categoria)
        document.getElementById('nome').value = nome;
        document.getElementById('url').value = url;
        document.getElementById('urlvideo').value = urlvideo;
        document.getElementById('descricao').value = descricao;
        document.getElementById('imagem').value = img;
    });
};

function updateGame() {
     // Ler campos do formulário
     console.log(document.getElementById('nome').value);
     if ((document.getElementById('nome').value != "") &&
      (document.getElementById('url').value != '') &&
       (document.getElementById('descricao').value != '') &&
      (document.getElementById('imagem').value != '')){
         var browserGame = {
             nome: document.getElementById('nome').value.trim(),
             url: document.getElementById('url').value.trim(),
             urlvideo: document.getElementById('urlvideo').value.trim(),
             descricao: document.getElementById('descricao').value.trim(),
             imagem: document.getElementById('imagem').value.trim()
         }
 

         apiService.updateData("/browsergames", save, browserGame, function(status, dados) {
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
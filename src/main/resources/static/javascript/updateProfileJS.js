const apiService = new APIService();
var userId = sessionStorage.getItem("user");



function getProfile(){
    apiService.getById("/membros", userId, function(status, response) {
        if(status < 200 || status > 299 ) {
            document.getElementById("mensagem").innerHTML += "<p class='error_message'>Erro ao carregar os dados: " + status + " - " + json.message + "</p>";
            return;
        }

        var nomeCompleto = response.nomeCompleto;
        var username = response.username;
        var dataNascimento = response.dataNascimento;
        var estado = response.estado;
        var senha = response.senha;
        var pais = response.pais
        var isEditor = response.isEditor
        console.log(response.categoria)
        document.getElementById('nomeCompleto').value = nomeCompleto;
        document.getElementById('username').value = username;
        document.getElementById('senha').value = senha;
        document.getElementById('estado').value = estado;
        document.getElementById('pais').value = pais;
        document.getElementById('dataNascimento').value = dataNascimento
        if (isEditor == true) {
            document.getElementById('Administrador').checked = true

        } else {
            document.getElementById('Leitor').checked = true

        }
    });
};

function updateMembro() {
    if ((document.getElementById('nomeCompleto').value.trim() != "") &&
     (document.getElementById('username').value.trim() != '') &&
      (document.getElementById('senha').value.trim() != '') &&
     (document.getElementById('estado').value.trim() != '') &&
     (document.getElementById('pais').value.trim() != '')) {

        var isEditorValue = document.querySelector('input[name="user_role"]:checked').value;
        var isEditor = false
        if (isEditorValue == "Administrador") {
            isEditor = true
        }

        console.log(isEditor)

         var membro = {
            "nomeCompleto": document.getElementById('nomeCompleto').value.trim(),
            "username": document.getElementById('username').value.trim(),
            "senha": document.getElementById('senha').value.trim(),
            "dataNascimento": document.getElementById('dataNascimento').value,
            "estado": document.getElementById('estado').value.trim(),
            "pais": document.getElementById('pais').value.trim(),
            "isEditor": isEditor
         }

         apiService.updateData("/membros", userId, membro, function(status, dados) {
            if(status < 200 || status > 299 ) {
                document.getElementById("mensagem").innerHTML += "<p class='error_message'>Erro ao atualizar os dados: " + status + " - " + dados.message + "</p>";
                return;
            }

            window.location = "profile.html";
        });

         
     } else {
        document.getElementById("mensagem").innerHTML = "<p class='error_message'>Erro ao atualizar membro - campos em branco</p>";
    }
}
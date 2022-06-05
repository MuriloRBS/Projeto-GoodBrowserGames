const apiService = new APIService();

function logUserIn() {
    if ((document.getElementById('username').value != "") && (document.getElementById('senha').value != "")) {
        var username = document.getElementById("username").value.trim()
        var senha = document.getElementById("senha").value
        apiService.getById(`/membros/${username}`, senha, function(status, response) {
            if(status < 200 || status > 299 ) {
                if (status == 404) {
                    document.getElementById("mensagem").innerHTML = "<p class='error_message'>Usuário não encontrado</p>";
                } else if (status == 406) {
                    document.getElementById("mensagem").innerHTML = "<p class='error_message'>Senha incorreta</p>";
                }
                return;
            }

            saveUser(response.id);
            if (response.isEditor == true) {
                saveRole(1)
            } else {
                saveRole(0)
            }
            window.location = "allGames.html";
        });
    } else {
        document.getElementById("mensagem").innerHTML = "<p class='error_message'>Campos em branco</p>";
    }
}

function saveUser(id){
    sessionStorage.setItem("user", id);
}

function saveRole(id){
    sessionStorage.setItem("userRole", id);
}
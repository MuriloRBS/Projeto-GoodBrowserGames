const apiService = new APIService();

function addMembro() {
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

         apiService.create("/membros", membro, function (status, dados) {
            if (status < 200 || status > 299) {
                document.getElementById("mensagem").innerHTML = "<p class='error_message'>Este usuário já existe</p>";
                return;
            }

            document.getElementById("mensagem").innerHTML = "<p class='good'>Membro " + membro.username + " cadastrado</p>"

            document.getElementById('nomeCompleto').value = '';
            document.getElementById('username').value = '';
            document.getElementById('senha').value = '';
            document.getElementById('estado').value = '';
            document.getElementById('pais').value = '';

            saveUser(dados.id);

            if (isEditor == true) {
                saveRole(1)
            } else {
                saveRole(0)
            }
            
            
            window.location = "allGames.html";

        });
     } else {
        document.getElementById("mensagem").innerHTML = "<p class='error_message'>Erro ao cadastrar membro - campos em branco</p>";
    }
}

function saveUser(id){
    sessionStorage.setItem("user", id);
}

function saveRole(id){
    sessionStorage.setItem("userRole", id);
}
const apiService = new APIService();
var userId = sessionStorage.getItem("user");


function getUser(){
    if (userId != null) {
        apiService.getById("/membros", userId, function(status, response) {
            if(status < 200 || status > 299 ) {
                document.getElementById("mensagem").innerHTML += "<p class='error_message'>Erro ao carregar os dados: " + status + " - " + json.message + "</p>";
                return;
            }

            var html = ""
            var nomeCompleto = response.nomeCompleto;
            var username = response.username;
            var dataNascimento = response.dataNascimento;
            var estado = response.estado;
            var pais = response.pais
            var isEditor = response.isEditor
            html += 
                `<div id='membro'>
                    <div id='imagem'>
                        <img src='imagens/iconePerfil.png'>
                    </div>
                    <div id='informacao'>
                        <h1 id='username'>${username}</h1>
                        <h3 id='nomeCompleto'>${nomeCompleto}</h3>
                        <p id='dataNascimento'>${dataNascimento}</p>
                        <p id='estado'>${estado}</p>
                        <p id='pais'>${pais}</p>
                    </div>
                </div>
                <div id='botoes'>
                    <a href="" target="_blank"><input type='button' value='Atualizar dados' onclick='window.location = "updateProfile.html"'></a>
                    <input type='button' value='Avaliações' onclick='goToUpdate()'>
                    <div id="side-by-side">
                    <input id="cancelButton" type='button' value='Sair' onclick='logOut()'>`
            if (isEditor == true) {
                html +=  `
                <input type='button' value='Adicionar Game' onclick='window.location = "adicionarGame.html"'>
                <input type='button' value='Adicionar Categoria' onclick='window.location = "adicionarCategoria.html"'>
                <input type='button' value='Obter Relatórios' onclick='goToUpdate()'>`
            }   
            html += `</div></div>`;

            console.log(document.getElementById("resposta").innerHTML)
            document.getElementById("resposta").innerHTML = html
        });
    } else {
        document.getElementById('resposta').innerHTML = "<p class='error_message'>Você precisa estar logado!</p>";;
    }
};

function logOut() {
    localStorage.clear();
    sessionStorage.clear();
    window.location = "index.html";
}
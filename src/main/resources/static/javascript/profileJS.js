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
            `<div class="container-xl px-4 mt-4">
            <!-- Account page navigation-->
            <hr class="mt-0 mb-4">
            <div class="row">
                <div class="col-xl-4">
                    <!-- Profile picture card-->
                    <div class="card mb-4 mb-xl-0">
                        <div class="card-header">Foto de Perfil</div>
                        <div class="card-body text-center">
                            <!-- Profile picture image-->
                            <img class="img-account-profile rounded-circle mb-2" style="width:70%;"src="imagens/iconePerfil.png" alt="">
                        </div>
                        <input id="cancelButton" type='button' value='Sair' onclick='logOut()' style="background-color:#e22525dc; border:none;" class="btn btn-primary">
                        <button class="btn btn-primary" style="background-color:#e22525dc; border:none; " type="button" value='Atualizar dados' onclick='window.location = "updateProfile.html"'>Atualizar perfil</button>
                    </div>
                </div>
                <div class="col-xl-8">
                    <!-- Account details card-->
                    <div class="card mb-4">
                        <div class="card-header">Detalhes do Cadastro</div>
                        <div class="card-body">
                            <form>
                                <!-- Form Group (username)-->
                                <div class="mb-3">
                                    <label class="small mb-1" for="inputUsername">Username</label>
                                    <label class="form-control" id='username'>${username}
                                </div>
                                <!-- Form Group (nome)-->
                                <div class="mb-3">
                                    <label class="small mb-1" for="inputNome">Nome Completo</label>
                                    <label class="form-control" id='nomeCompleto'>${nomeCompleto}
                                </div>
                                <!-- Form Group (data)-->
                                <div class="mb-3">
                                    <label class="small mb-1" for="inputData">Data de Nascimento</label>
                                    <label class="form-control" id='dataNascimento'>${dataNascimento}
                                </div>
                                <!-- Form Group (estado)-->
                                <div class="mb-3">
                                    <label class="small mb-1" for="inputEstado">Estado</label>
                                    <label class="form-control" id='estado'>${estado}
                                </div>
                                <!-- Form Group (pais)-->
                                <div class="mb-3">
                                    <label class="small mb-1" for="inputUsername">Pais</label>
                                    <label class="form-control" id='pais'>${pais}
                                </div>
                                <button class="btn btn-primary" style="background-color:#e22525dc; border:none; " type="button" value='Atualizar dados' onclick='window.location = "updateProfile.html"'>Atualizar perfil</button>
                            
                        </div>
                 `
               /* `<div id='membro'>
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
                    <input id="cancelButton" type='button' value='Sair' onclick='logOut()'>`*/
            if (isEditor == true) {
                html +=  `<div class="row" style="margin-left:2%;">
                <input type='button'class="btn btn-primary" style="background-color:#e22525dc; display: inline-flex;
                width: auto; border:none; margin: auto; margin-left: 0;" value='Adicionar Game' onclick='window.location = "adicionarGame.html"'>
                <input type='button' class="btn btn-primary" style="background-color:#e22525dc; display: inline-flex;
                width: auto; border:none; margin: auto; margin-left: 0;" value='Adicionar Categoria' onclick='window.location = "adicionarCategoria.html"'>
                <input type='button' class="btn btn-primary" style="background-color:#e22525dc; display: inline-flex;
                width: auto; border:none;margin: auto; margin-left: 0;" value='Obter Relatorios' onclick='goToUpdate()'>
                </div></div></form>
                </div>
            </div>
        </div>`
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
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
                        <div class="card-header">Profile Picture</div>
                        <div class="card-body text-center">
                            <!-- Profile picture image-->
                            <img class="img-account-profile rounded-circle mb-2" src="imagens/iconePerfil.png" alt="">
                            <!-- Profile picture help block-->
                            <div class="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                            <!-- Profile picture upload button-->
                            <button class="btn btn-primary" type="button">Upload new image</button>
                        </div>
                    </div>
                </div>
                <div class="col-xl-8">
                    <!-- Account details card-->
                    <div class="card mb-4">
                        <div class="card-header">Account Details</div>
                        <div class="card-body">
                            <form>
                                <!-- Form Group (username)-->
                                <div class="mb-3">
                                    <label class="small mb-1" for="inputUsername">Username (how your name will appear to other users on the site)</label>
                                    <label class="form-control" id='username'>${username}>
                                </div>
                                <!-- Form Row-->
                                <div class="row gx-3 mb-3">
                                    <!-- Form Group (first name)-->
                                    <div class="col-md-6">
                                        <label class="small mb-1" for="inputFirstName">First name</label>
                                        <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value="Valerie">
                                    </div>
                                    <!-- Form Group (last name)-->
                                    <div class="col-md-6">
                                        <label class="small mb-1" for="inputLastName">Last name</label>
                                        <input class="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="Luna">
                                    </div>
                                </div>
                                <!-- Form Row        -->
                                <div class="row gx-3 mb-3">
                                    <!-- Form Group (organization name)-->
                                    <div class="col-md-6">
                                        <label class="small mb-1" for="inputOrgName">Organization name</label>
                                        <input class="form-control" id="inputOrgName" type="text" placeholder="Enter your organization name" value="Start Bootstrap">
                                    </div>
                                    <!-- Form Group (location)-->
                                    <div class="col-md-6">
                                        <label class="small mb-1" for="inputLocation">Location</label>
                                        <input class="form-control" id="inputLocation" type="text" placeholder="Enter your location" value="San Francisco, CA">
                                    </div>
                                </div>
                                <!-- Form Group (email address)-->
                                <div class="mb-3">
                                    <label class="small mb-1" for="inputEmailAddress">Email address</label>
                                    <input class="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value="name@example.com">
                                </div>
                                <!-- Form Row-->
                                <div class="row gx-3 mb-3">
                                    <!-- Form Group (phone number)-->
                                    <div class="col-md-6">
                                        <label class="small mb-1" for="inputPhone">Phone number</label>
                                        <input class="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value="555-123-4567">
                                    </div>
                                    <!-- Form Group (birthday)-->
                                    <div class="col-md-6">
                                        <label class="small mb-1" for="inputBirthday">Birthday</label>
                                        <input class="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value="06/10/1988">
                                    </div>
                                </div>
                                <!-- Save changes button-->
                                <button class="btn btn-primary" type="button">Save changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
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
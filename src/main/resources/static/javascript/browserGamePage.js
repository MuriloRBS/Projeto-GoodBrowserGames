var save = sessionStorage.getItem("save");
var categoriaId = sessionStorage.getItem("categoria1");
var userId = sessionStorage.getItem("user");
var userRole = sessionStorage.getItem("userRole");

const apiService = new APIService();

function getBrowserGame(){
    apiService.getById("/browsergames", save, function(status, response) {
        if(status < 200 || status > 299 ) {
            document.getElementById("mensagem").innerHTML += "<p class='error_message'>Erro ao carregar os dados: " + status + " - " + json.message + "</p>";
            return;
        }
        
        var html = ""
        var img = response.imagem;
        var nome = response.nome;
        var descricao = response.descricao;
        var url = response.url;
        var urlvideo = response.urlvideo
        html += 
            `<div id='imagem'>
                <img src='${img}'>
            </div>
            <div id='informacao'>
                <h1 id='nome'>${nome}</h1>
                <h3 id='categoria'>categoria</h3>
                <p id='descricao'>${descricao}</p>
                <div id='botoes'>
                    <input type='button' id="avaliar" value='Avaliar' onclick='goToAvaliar()'>
                    <a href="${url}" target="_blank"><input type='button' value='Jogar'></a>
                    <a href="${urlvideo}" target="_blank"><input type='button' value='Vídeo'></a>`;
        console.log(userRole)

        if (userRole == 1) {
            console.log("aoba")
            html +=  `
            <input type='button' value='Atualizar'  onclick='goToUpdate()'>
            <input type='button' value='Deletar' onclick='deleteGame(${save})'>`
        }   
        html += `</div></div>`;
        getNameCategoria(categoriaId);
        document.getElementById("browserGame").innerHTML = html
    });

    apiService.getById('/membrosGamesAvaliacoes', save, function(status, response) {
        if(status < 200 || status > 299 ) {
            document.getElementById("mensagem").innerHTML += "<p class='error_message'>Erro ao carregar os dados: " + status + " - " + json.message + "</p>";
            return;
        }

        html = ""
        for(var j=0; j<response.length; j++) {
            var avaliacao = response[j]
            var myDate = new Date(avaliacao.avaliacao.data);
            var final_date = myDate.getDate()+"-"+(myDate.getMonth()+1)+"-"+myDate.getFullYear();
            html += 
            `<div id='avaliacao'>
                <div id='cabecalho'>
                    <p id='data'>${final_date}</p>
                    <p id='userName'>${avaliacao.membro.username}</p>
                </div>
                <textarea cols='60' rows='8' id='textoAva'>${avaliacao.avaliacao.texto}</textarea>
                <p id='nota'>Nota: ${avaliacao.avaliacao.estrelas}</p>
                <div id="util">
                    <input type='button' id='utilB' value='Útil' onclick='marcarUtil(${avaliacao.avaliacao.id})'>
                    <p>${avaliacao.avaliacao.likes}</p>
                </div>`
            if (avaliacao.membro.id == userId) {
                html += `<input type='button' value='Editar'  onclick='saveAvaliacao(${avaliacao.avaliacao.id}); goToUpdateAvaliacao()'>`
            }
            html += `</div>`;
        }
        document.getElementById("avaliacoes").innerHTML += html
    });
};

function getNameCategoria(id) {
    apiService.getById("/categorias", id, function(status, response) {
        if(status < 200 || status > 299 ) {
            document.getElementById("mensagem").innerHTML += "<p class='error_message'>Erro ao carregar os dados: " + status + " - " + json.message + "</p>";
            return;
        }
        categoriaNome = response.nome;
        document.getElementById("categoria").innerHTML = categoriaNome
    });
};

function goToUpdate() {
    window.location = "updateGame.html";
}

function saveAvaliacao(id){
    sessionStorage.setItem("avaliacaoId", id);
}

function goToAvaliar() {
    window.location = "avaliarGame.html";
}

function goToUpdateAvaliacao() {
    window.location = "updateAvaliacao.html"
}

function deleteGame(id) {
    if(confirm("Deseja apagar esse browserGame do sistema?")) {
        apiService.deleteData("/browsergames", id, function(status, dados) {
            if(status < 200 || status > 299 ) {
                document.getElementById("mensagem").innerHTML += "<p class='error_message'>Erro ao apagar os dados: " + status + " - " + dados.message + "</p>";
                return
            }
            
            window.location = "allGames.html";
        });
    }
};

function marcarUtil(id) {
    apiService.updateData("/avaliacoes/like", id, "", function(status, dados) {
        if(status < 200 || status > 299 ) {
            document.getElementById("mensagem").innerHTML += "<p class='error_message'>Erro ao atualizar os dados: " + status + " - " + dados.message + "</p>";
            return;
        }

        window.location.reload()
    });
}
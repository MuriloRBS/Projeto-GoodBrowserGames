const apiService = new APIService();
var userId = sessionStorage.getItem("user");

function getAllGames(){
    if (userId != null) {
        apiService.getAll("/categorias", function(status, response){
            if(status < 200 || status > 299 ) {
                document.getElementById("resposta").innerHTML += "<p class='error_message'>Erro ao carregar os dados: " + status + " - " + response.message + "</p>";
                return;
            }

            
            for(var i=0; i<response.length; i++){
                var categoria = response[i]
                if (categoria.browserGames.length == 0) {
                    continue
                }
                var html = "<div class='categoria'><div class='titulo'><h2>" + categoria.nome + "</h2></div><div class='browserGames'>" ;
                for(var j=0; j<categoria.browserGames.length; j++) {
                    let browserGame = categoria.browserGames[j];
                    html += `
                    <a href="browserGame.html" onclick= "saveGame(${browserGame.id}); saveCategoria(${categoria.id})">
                        <div class='browserGame'>
                                <div class='imagem'><img src="${browserGame.imagem}"/></div>
                                <p id='nome'>${browserGame.nome}</p>
                                <p id='categoria'>${categoria.nome}</p>
                        </div>
                    </a>`;
                }
                html += "</div></div>";
                document.getElementById('resposta').innerHTML += html;

                
            }
        });
    } else {
        document.getElementById('resposta').innerHTML = "<p class='error_message'>Você precisa estar logado!</p>";;
    }
};

function searchGames(gameName){
    if (userId != null) {
        apiService.getById("/browsergames/search", gameName, function(status, response) {
            if(status < 200 || status > 299 ) {
                document.getElementById("resposta").innerHTML += "<p class='error_message'>Erro ao carregar os dados: " + status + " - " + response.message + "</p>";
                return;
            }

            var html = "<div id='browserGamesSearch'>"
            for(var i=0; i<response.length; i++){
                    let browserGame = response[i];
                    html += `
                    <a href="browserGame.html" onclick= "saveGame(${browserGame.id})">
                        <div class='browserGame'>
                                <div class='imagem'><img src="${browserGame.imagem}"/></div>
                                <p id='nome'>${browserGame.nome}</p>
                        </div>
                    </a>`;
                }
                html += "</div>";
                document.getElementById('resposta').innerHTML = html;
        });
    } else {
        document.getElementById('resposta').innerHTML = "<p class='error_message'>Você precisa estar logado!</p>";;
    }
};

function getTopAvaliacoes(){
    if (userId != null) {
        apiService.getAll("/membrosGamesAvaliacoes", function(status, response){
            if(status < 200 || status > 299 ) {
                document.getElementById("resposta").innerHTML += "<p class='error_message'>Erro ao carregar os dados: " + status + " - " + response.message + "</p>";
                return;
            }
            html = ""
            response.sort(function(a,b) {
                return b.avaliacao.likes - a.avaliacao.likes
            })
            console.log(response)
            for(var j=0; j<response.length; j++) {
                var avaliacao = response[j]
                var myDate = new Date(avaliacao.avaliacao.data);
                var final_date = myDate.getDate()+"-"+(myDate.getMonth()+1)+"-"+myDate.getFullYear();
                html += 
                `<div id='avaliacoes'><div id='avaliacao'>
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
                html += `</div></div>`;
            }
            document.getElementById("resposta").innerHTML = html
            console.log
        });
    } else {
        document.getElementById('resposta').innerHTML = "<p class='error_message'>Você precisa estar logado!</p>";;
    }
};

function saveGame(id){
    sessionStorage.setItem("save", id);
}

function saveCategoria(id) {
    sessionStorage.setItem("categoria1", id);
}

function GetSortOrder(ant, prop) {
    return function(a, b) {
        if (a[ant][prop] > b[ant][prop]) {
            return 1;
        } else if (a[ant][prop] < b[ant][prop]) {
            return -1;
        }
        return 0;
    }
 }
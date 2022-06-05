class APIService {
    constructor() {

    }

    getAll(url, callBack) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onreadystatechange = function() {
            callBack(xhr.status, xhr.response);
        };
        xhr.send();
    }

    getById(url, id, callBack) {
        var finalURL = url + "/" + id
        let xhr = new XMLHttpRequest();
        xhr.open('GET', finalURL, true);
        xhr.responseType = 'json';
        xhr.onreadystatechange = function() {
            callBack(xhr.status, xhr.response);
        };
        xhr.send();
    }

    create(url, data, callback) {
        var xhr = new XMLHttpRequest();
        
        var dados = JSON.stringify(data);

        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.responseType = 'json';
        xhr.onload = function () {
            callback(xhr.status, xhr.response);
        }
        xhr.send(dados);
    }

    deleteData(url, id, callback) {
        var finalURL = url + "/" + id
        var xhr = new XMLHttpRequest();
        
        xhr.open('DELETE', finalURL, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.responseType = 'json';
        xhr.onload = function () {
            callback(xhr.status, xhr.response);
        }
        xhr.send();
    }

    updateData(url, id, data, callback) {
        var finalURL = url + "/" + id
        console.log(finalURL)
        var xhr = new XMLHttpRequest();
        
        var dados = JSON.stringify(data);
        
        xhr.open('PUT', finalURL, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.responseType = 'json';
        xhr.onload = function () {
            callback(xhr.status, xhr.response);
        }
        xhr.send(dados);
    }
}
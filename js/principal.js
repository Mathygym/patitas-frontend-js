window.addEventListener('load',function(){

    //referencia del elemnto de la pagina
    const msgSuccess = this.document.getElementById('msgSuccess');
    //RECUPÉRAR EL NOMBRE DEL USUARIO DEL LOCALSTORE

    const result = JSON.parse(this.localStorage.getItem('result'))

    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);
});

function mostrarAlerta(mensaje){
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = "block";
}

function ocultarAlerta(){
    msgSuccess.innerHTML = '';
    msgSuccess.style.display = 'none';
}